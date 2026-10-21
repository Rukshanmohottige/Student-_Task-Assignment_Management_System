import React from 'react';

export default function MetricCard({
  title,
  value,
  unit,
  subtitle,
  badgeText,
  badgeType = 'default',
  icon,
  iconBg = 'bg-indigo-50 text-indigo-600',
  glowBg = 'bg-primary/5',
}) {
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
      case 'warning':
      case 'urgent':
        return 'bg-red-50 text-red-700 border border-red-200/60';
      case 'info':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200/60';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between gap-4">
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${glowBg} pointer-events-none`}></div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
            {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
        {badgeText && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeClass()}`}>
            {badgeType === 'urgent' && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
            {badgeType === 'success' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
