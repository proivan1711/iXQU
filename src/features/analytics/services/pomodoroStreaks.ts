import { getData } from "@/features/analytics/services/analyticsDatabase";

export default function getPomodoroStreaks() {
  const completedPomodoros = getData()
    .pomodoros.filter((p) => p.totalDuration === p.goalDuration)
    .map((p) => new Date(p.date).toDateString())
    .filter((date, i, arr) => arr.indexOf(date) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  const today = new Date().toDateString();
  const expectedDate = new Date(today);

  for (const dateStr of completedPomodoros) {
    const pomodoroDate = new Date(dateStr).toDateString();

    if (pomodoroDate === expectedDate.toDateString()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
