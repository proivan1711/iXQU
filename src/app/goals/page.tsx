import GoalCard from "@/features/goals/components/Goal";

export default function Goals() {
  return (
    <div className="flex flex-col items-center justify-start gap-30 w-full h-dvh">
      <h1 className="text-7xl md:text-9xl text-balance font-semibold text-center mt-20">
        Goals
      </h1>
      <div>
        <GoalCard />
      </div>
    </div>
  );
}
