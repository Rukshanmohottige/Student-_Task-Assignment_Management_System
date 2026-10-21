import React from 'react';

export default function AssignmentsGrid({
  assignments = [],
  selectedIds = [],
  onSelectOne,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            High
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Low
          </span>
        );
    }
  };

  if (assignments.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400">
        <span className="material-symbols-outlined text-4xl mb-1 text-slate-300">search_off</span>
        <p className="font-medium text-sm">No assignments match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-5">
      {assignments.map((item) => {
        const isChecked = selectedIds.includes(item.id);
        const isDone = item.status === 'COMPLETED';

        return (
          <div
            key={item.id}
            onClick={() => onEdit(item)}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-md transition-all flex flex-col justify-between gap-4 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono text-[11px] font-bold">
                    {item.course?.code || 'CS 301'}
                  </span>
                  {getPriorityBadge(item.priority)}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => onSelectOne(item.id)}
                  className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
              </div>

              <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors text-sm leading-snug line-clamp-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="material-symbols-outlined text-[15px]">event</span>
                  {item.dueDateDisplay || 'Upcoming'}
                </span>
                <span className="font-mono text-[11px] font-semibold text-slate-700">
                  {item.progress ?? (isDone ? 100 : 0)}%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    isDone ? 'bg-emerald-500' : 'bg-brand-600'
                  }`}
                  style={{ width: `${item.progress ?? (isDone ? 100 : 0)}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => onToggleStatus(item.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {isDone ? 'check' : 'radio_button_unchecked'}
                  </span>
                  <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="p-1 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 cursor-pointer"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[17px]">edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete assignment "${item.title}"?`)) onDelete(item.id);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[17px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
