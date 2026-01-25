import AnalyticsPomodoroTimePerDayChart from "@/features/analytics/components/AnalyticsPomodoroTimePerDayChart";
import Streak from "@/features/analytics/components/Streak";

export default function Analytics() {
  return (
    <div className="p-20 items-center justify-center gap-15">
      <h1 className="text-9xl text-balance font-semibold text-center mb-20">
        Analytics
      </h1>
      <Streak />
      <AnalyticsPomodoroTimePerDayChart />
    </div>
  );
}
