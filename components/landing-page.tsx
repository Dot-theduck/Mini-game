"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Trophy, Users, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LandingPage() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (playerName.trim()) {
      router.push(`/game?name=${encodeURIComponent(playerName)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            QuizMaster
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Challenge your friends in real-time and prove your knowledge supremacy!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Multiple Categories"
              description="Test your knowledge across various exciting topics"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Multiplayer"
              description="Compete with friends in real-time matches"
            />
            <FeatureCard
              icon={<Timer className="w-8 h-8" />}
              title="Timed Rounds"
              description="Think fast and answer quickly to score more points"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Leaderboard"
              description="Track your progress and climb the rankings"
            />
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-lg h-12"
            />
            <Button
              onClick={handleJoinGame}
              className="w-full h-12 text-lg"
              disabled={!playerName.trim()}
            >
              Join Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}