"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Atom,
  Brain,
  Lightbulb,
  Timer,
  Trophy,
  Rocket,
} from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';
import { InstructionCard } from '@/components/ui/instruction-card';

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
export function HomePage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState('normal');

  const handleStartQuiz = () => {
    router.push(`/quiz?difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Atom className="w-20 h-20 text-primary animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Physics Master
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Challenge yourself with advanced physics concepts and become a master of the universe!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
              onClick={handleStartQuiz}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Test Your Knowledge"
            description="Challenge yourself with questions from various physics domains"
          />
          <FeatureCard
            icon={<Timer className="w-8 h-8" />}
            title="Quick Feedback"
            description="Get instant feedback and detailed explanations for each answer"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Track Progress"
            description="Monitor your score and earn achievements as you improve"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How to Play</h2>
          <div className="grid gap-6">
            <InstructionCard
              icon={<Lightbulb className="w-6 h-6" />}
              title="1. Choose Your Difficulty"
              description="Select the difficulty level that matches your knowledge"
            />
            <InstructionCard
              icon={<Brain className="w-6 h-6" />}
              title="2. Answer Questions"
              description="Read each question carefully and select the best answer"
            />
            <InstructionCard
              icon={<Trophy className="w-6 h-6" />}
              title="3. Learn and Improve"
              description="Review explanations and track your progress to become a physics master"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
      </div>
    </div>
  );
}