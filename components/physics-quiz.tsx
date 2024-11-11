"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Trophy, AlertCircle, CheckCircle2, Home, Medal } from 'lucide-react';
import { physicsQuestions } from '@/lib/questions';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type HighScore = {
  name: string;
  score: number;
  date: string;
};

// Simulated high scores (in a real app, this would come from a database)
const highScores: HighScore[] = [
  { name: "Alice", score: 9, date: "2024-03-20" },
  { name: "Bob", score: 8, date: "2024-03-19" },
  { name: "Charlie", score: 8, date: "2024-03-18" },
  { name: "David", score: 7, date: "2024-03-17" },
  { name: "Eve", score: 7, date: "2024-03-16" },
];

export function PhysicsQuiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = physicsQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / physicsQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      if (answerIndex === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < physicsQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const NavigationButtons = () => (
    <div className="flex gap-4 justify-center mt-6">
      <Button
        variant="outline"
        onClick={() => router.push('/')}
        className="flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        Home
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Medal className="w-4 h-4" />
            Leaderboard
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Trophy className="w-5 h-5 text-yellow-500" />
              High Scores
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {highScores.map((highScore, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary w-6">
                    #{index + 1}
                  </span>
                  <span className="font-medium">{highScore.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{highScore.score}/10</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(highScore.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  if (quizCompleted) {
    const percentage = (score / physicsQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="mb-8">
            {percentage >= 70 ? (
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            ) : (
              <Brain className="w-16 h-16 mx-auto text-primary mb-4" />
            )}
            <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-xl mb-2">Your Score: {score}/{physicsQuestions.length}</p>
            <Progress value={percentage} className="w-full mb-4" />
            
            {percentage >= 70 && (
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                <p className="text-green-700 dark:text-green-300 font-semibold">
                  Congratulations! Outstanding performance! 🎉
                </p>
              </div>
            )}
            
            <p className="text-muted-foreground">
              {percentage >= 90 ? "Exceptional! You're a physics master!" :
               percentage >= 70 ? "Great job! You have a solid understanding of physics!" :
               percentage >= 50 ? "Good effort! Keep studying to improve your score!" :
               "Keep practicing! Physics can be challenging, but you'll get better!"}
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={handleRestartQuiz} size="lg" className="w-full">
              Try Again
            </Button>
            <NavigationButtons />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {physicsQuestions.length}
              </span>
              <span className="text-sm font-medium">Score: {score}/{physicsQuestions.length}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === null ? "outline" : 
                        index === currentQuestion.correctAnswer ? "default" :
                        selectedAnswer === index ? "destructive" : "outline"}
                className={cn(
                  "w-full justify-start h-auto py-4 px-6 text-left",
                  selectedAnswer !== null && index === currentQuestion.correctAnswer && "bg-green-500 hover:bg-green-600",
                  selectedAnswer === index && index !== currentQuestion.correctAnswer && "bg-red-500 hover:bg-red-600"
                )}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
                {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="ml-auto h-5 w-5" />
                )}
                {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <AlertCircle className="ml-auto h-5 w-5" />
                )}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className={cn(
              "p-4 rounded-lg mb-6",
              selectedAnswer === currentQuestion.correctAnswer 
                ? "bg-green-100 dark:bg-green-900/20" 
                : "bg-red-100 dark:bg-red-900/20"
            )}>
              <p className={cn(
                "font-medium",
                selectedAnswer === currentQuestion.correctAnswer 
                  ? "text-green-700 dark:text-green-300" 
                  : "text-red-700 dark:text-red-300"
              )}>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestionIndex === physicsQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
            <NavigationButtons />
          </div>
        </Card>
      </div>
    </div>
  );
}