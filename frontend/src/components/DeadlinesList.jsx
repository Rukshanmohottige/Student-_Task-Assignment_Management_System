import React from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function DeadlinesList({ assignments, onToggle, onEdit }) {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCheckboxClick = (e, id) => {
    e.stopPropagation();
    triggerConfetti();
    if (onToggle) onToggle(id);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            High Priority
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Upcoming Deadlines</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            {assignments.length} Remaining
          </span>
        </div>
        <Link
          to="/assignments"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
        >
          <span>View all assignments</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>

      {assignments.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500">
          <span className="material-symbols-outlined text-4xl text-emerald-500 mb-2">task_alt</span>
          <p className="font-semibold text-sm">All caught up! No pending deadlines.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {assignments.map((item) => (
            <div
              key={item.id}
              onClick={() => onEdit && onEdit(item)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  type="button"
                  aria-label="Toggle status"
                  onClick={(e) => handleCheckboxClick(e, item.id)}
                  className={`w-5 h-5 rounded mt-0.5 border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    item.status === 'COMPLETED'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-brand-600 group-hover:bg-brand-50'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      item.status === 'COMPLETED' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 text-brand-600'
                    }`}
                  >
                    check
                  </span>
                </button>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] font-bold font-mono">
                      {item.course?.code || 'GEN'}
                    </span>
                    {getPriorityBadge(item.priority)}
                    {item.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${
                    item.priority === 'HIGH'
                      ? 'bg-red-50 text-red-700 border border-red-200/50'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {item.priority === 'HIGH' ? 'event_busy' : 'schedule'}
                  </span>
                  {item.dueDateDisplay || 'Upcoming'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-500'
                        : item.progress > 0
                        ? 'bg-brand-600 animate-pulse'
                        : 'bg-slate-300'
                    }`}
                  ></span>
                  {item.status === 'COMPLETED' ? 'Completed' : item.progress > 0 ? 'In Progress' : 'Not Started'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
