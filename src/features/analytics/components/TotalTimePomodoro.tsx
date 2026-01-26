import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TotalTimePomodoro({
  totalHours,
}: {
  totalHours: number;
}) {
  return (
    <Card className="justify-center">
      <CardHeader className="sm:ml-8">
        <CardDescription>Total time</CardDescription>
        <CardTitle className="text-6xl font-semibold tabular-nums mt-4">
          {totalHours}
          <span className="text-lg text-muted-foreground ml-1.5">h</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
