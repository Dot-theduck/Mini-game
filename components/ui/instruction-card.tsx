import { Card } from '@/components/ui/card';

interface InstructionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function InstructionCard({ icon, title, description }: InstructionCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}