"use client";

import { formatDuration } from "date-fns";
import { Trash } from "lucide-react";
import { Bar, BarChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

const chartConfig = {
  pomodoros: {
    label: "Pomodoro Time",
  },
} satisfies ChartConfig;

const data = [
  {
    day: "Monday",
    value: 120,
  },
  {
    day: "Tuesday",
    value: 150,
  },
  {
    day: "Wednesday",
    value: 90,
  },
  {
    day: "Thursday",
    value: 180,
  },
  {
    day: "Friday",
    value: 160,
  },
  {
    day: "Saturday",
    value: 100,
  },
  {
    day: "Sunday",
    value: 75,
  },
];

export default function GoalCard() {
  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Full stack web developer
        </CardTitle>
        <CardDescription>Goal</CardDescription>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <ChartContainer config={chartConfig} className="w-70">
          <BarChart accessibilityLayer data={data}>
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-30" nameKey="pomodoros" />
              }
              formatter={(time: number) => {
                return formatDuration({
                  minutes: time % 60,
                  hours: Math.floor(time / 60),
                });
              }}
            />
            <Bar dataKey={"value"} fill={"var(--color-primary)"} />
          </BarChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          <Progress value={30} />
          <span className="font-semibold">5 / 50 min</span>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
        <Button>Start</Button>
      </CardFooter>
    </Card>
  );
}
