"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { io, Socket } from 'socket.io-client';
import { Timer, Users } from 'lucide-react';

type Player = {
  id: string;
  name: string;
  score: number;
};

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const playerName = searchParams.get('name') || 'Anonymous';
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('join', { name: playerName });

    newSocket.on('players', (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    });

    newSocket.on('question', (question: Question) => {
      setCurrentQuestion(question);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setIsAnswered(false);
    });

    newSocket.on('timeUpdate', (time: number) => {
      setTimeLeft(time);
    });

    return () => {
      newSocket.close();
    };
  }, [playerName]);

  const handleAnswer = (answerIndex: number) => {
    if (!isAnswered && socket) {
      setSelectedAnswer(answerIndex);
      setIsAnswered(true);
      socket.emit('answer', { questionId: currentQuestion?.id, answer: answerIndex });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <span className="text-lg font-semibold">{timeLeft}s</span>
                </div>
                <Progress value={(timeLeft / 15) * 100} className="w-48" />
              </div>

              {currentQuestion ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "secondary" : "outline"}
                        className="h-auto py-4 text-left justify-start"
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                      >
                        <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold mb-4">Waiting for next question...</h2>
                  <p className="text-muted-foreground">Get ready!</p>
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Leaderboard</h3>
              </div>
              <div className="space-y-4">
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-secondary"
                    >
                      <span className="font-medium">
                        {player.name}
                        {player.name === playerName && " (You)"}
                      </span>
                      <span className="font-bold">{player.score}</span>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}