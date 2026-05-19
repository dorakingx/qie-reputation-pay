export function ReputationBar({ score }: { score: number }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-600">Reputation Score</span>
        <span className="font-semibold text-slate-900">{score}/100</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
