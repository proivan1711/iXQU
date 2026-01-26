"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getData } from "@/features/analytics/services/analyticsDatabase";

const chartConfig = {
  desktop: {
    label: "Pomodoro total time",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AnalyticsPomodoroTimePerDayChart() {
  const { pomodoros } = getData();

  const chartData = pomodoros
    .map((pomodoro) => {
      const date = new Date(pomodoro.date);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        totalDuration: Math.floor(pomodoro.totalDuration / 60 / 1000),
        timestamp: date.getTime(),
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  return (
    <Card className="col-span-full lg:max-w-[120dvh]">
      <CardHeader>
        <CardTitle>Pomodoros time</CardTitle>
        <CardDescription>Showing each pomodoro session</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              formatter={(value) => ["Total duration: ", `${value} min`]}
            />
            <Area
              dataKey="totalDuration"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
