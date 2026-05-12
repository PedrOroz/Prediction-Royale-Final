import { useState, useCallback, useEffect, useRef } from 'react';
import { GamePhase, Room, Prediction, PriceData } from '@/lib/types';
import { MOCK_ROOMS, MOCK_PRICE } from '@/lib/mockData';

const ROUND_DURATION = 60; // seconds

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>('lobby');
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [currentPrice, setCurrentPrice] = useState<PriceData>(MOCK_PRICE);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [myPrediction, setMyPrediction] = useState<Prediction>(null);
  const [roundResolved, setRoundResolved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const delta = (Math.random() - 0.5) * 0.6;
        return {
          price: Math.max(1, +(prev.price + delta).toFixed(2)),
          confidence: +(Math.random() * 0.15).toFixed(3),
          timestamp: Date.now(),
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (phase === 'game' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [phase, timeLeft]);

  // Auto-resolve round when timer hits 0
  useEffect(() => {
    if (phase === 'game' && timeLeft === 0 && activeRoom && !roundResolved) {
      resolveRound();
    }
  }, [timeLeft, phase, activeRoom, roundResolved]);

  const joinRoom = useCallback(
    (roomId: string) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) return;

      setPhase('joining');

      // Simulate joining delay
      setTimeout(() => {
        const updatedRoom: Room = {
          ...room,
          status: 'in_progress',
          currentRound: 1,
          startPrice: currentPrice.price,
          roundEndTime: Date.now() + ROUND_DURATION * 1000,
        };
        setActiveRoom(updatedRoom);
        setTimeLeft(ROUND_DURATION);
        setMyPrediction(null);
        setRoundResolved(false);
        setPhase('game');
      }, 1500);
    },
    [rooms, currentPrice]
  );

  const makePrediction = useCallback((prediction: Prediction) => {
    setMyPrediction(prediction);
  }, []);

  const resolveRound = useCallback(() => {
    if (!activeRoom || roundResolved) return;
    setRoundResolved(true);

    const endPrice = currentPrice.price;
    const direction = endPrice >= (activeRoom.startPrice || 0) ? 'up' : 'down';
    const correct = myPrediction === direction;

    setActiveRoom((prev) => {
      if (!prev) return null;

      const updatedPlayers = prev.players.map((p) => {
        if (p.eliminated) return p;
        // Simulate other players
        const otherCorrect = Math.random() > 0.4;
        return {
          ...p,
          lives: otherCorrect ? p.lives : Math.max(0, p.lives - 1),
          eliminated: otherCorrect ? false : p.lives <= 1,
          prediction: null,
        };
      });

      // Update "my" player (first non-eliminated)
      const myIndex = updatedPlayers.findIndex(
        (p) => !p.eliminated && p.address === updatedPlayers[0]?.address
      );
      if (myIndex >= 0) {
        const myLives = correct
          ? updatedPlayers[myIndex].lives
          : Math.max(0, updatedPlayers[myIndex].lives - 1);
        updatedPlayers[myIndex] = {
          ...updatedPlayers[myIndex],
          lives: myLives,
          eliminated: myLives === 0,
        };
      }

      const aliveCount = updatedPlayers.filter((p) => !p.eliminated).length;
      const isFinished = aliveCount <= 1 || prev.currentRound >= prev.totalRounds;

      const winner = isFinished
        ? updatedPlayers.find((p) => !p.eliminated)?.address || null
        : null;

      return {
        ...prev,
        players: updatedPlayers,
        currentRound: prev.currentRound + 1,
        endPrice,
        status: isFinished ? 'finished' : 'in_progress',
        winner,
      };
    });

    // After short delay, either go to next round or result
    setTimeout(() => {
      setActiveRoom((prev) => {
        if (!prev) return null;
        if (prev.status === 'finished') {
          setPhase('result');
          return prev;
        }
        // Next round
        setMyPrediction(null);
        setRoundResolved(false);
        setTimeLeft(ROUND_DURATION);
        return {
          ...prev,
          startPrice: currentPrice.price,
          endPrice: null,
          roundEndTime: Date.now() + ROUND_DURATION * 1000,
        };
      });
    }, 3000);
  }, [activeRoom, currentPrice, myPrediction, roundResolved]);

  const claimPrize = useCallback(() => {
    // Simulate claim
    setActiveRoom((prev) => {
      if (!prev) return null;
      return { ...prev, status: 'finished' };
    });
    // Reset to lobby after short delay
    setTimeout(() => {
      setPhase('lobby');
      setActiveRoom(null);
      setMyPrediction(null);
    }, 2000);
  }, []);

  const backToLobby = useCallback(() => {
    setPhase('lobby');
    setActiveRoom(null);
    setMyPrediction(null);
    setRoundResolved(false);
    setTimeLeft(0);
  }, []);

  return {
    phase,
    rooms,
    activeRoom,
    currentPrice,
    timeLeft,
    myPrediction,
    roundResolved,
    joinRoom,
    makePrediction,
    claimPrize,
    backToLobby,
  };
}
