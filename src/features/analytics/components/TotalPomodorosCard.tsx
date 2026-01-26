import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";

export default function TotalPomodorosCard({
  totalPomodorosCount,
}: {
  totalPomodorosCount: number;
}) {
  return (
    <Card className="justify-center">
      <CardHeader className="sm:ml-8">
        <CardDescription>Total pomodoros</CardDescription>
        <CardTitle className="text-6xl font-semibold tabular-nums mt-4">
          {totalPomodorosCount}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
