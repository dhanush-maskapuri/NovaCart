const EcoScoreBadge = ({ price = 1000 }) => {
  const ecoScore = Math.min(96, Math.max(68, Math.round((price % 32) + 68)));

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-black text-emerald-700 dark:text-emerald-300">
      <span>🌱 Eco Score: <strong>{ecoScore}/100</strong></span>
      <span className="text-slate-400">|</span>
      <span>Recyclable Packaging</span>
    </div>
  );
};

export default EcoScoreBadge;
