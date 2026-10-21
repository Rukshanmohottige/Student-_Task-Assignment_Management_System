import React from 'react';

export default function AssignmentsTable({
  assignments = [],
  selectedIds = [],
  onSelectAll,
  onSelectOne,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const allSelected = assignments.length > 0 && selectedIds.length === assignments.length;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200/60 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            High Priority
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Low Priority
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'COMPLETED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        Pending
      </span>
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <th className="py-3 px-4 w-12 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                aria-label="Select all assignments"
              />
            </th>
            <th className="py-3 px-4 font-semibold">Assignment & Course</th>
            <th className="py-3 px-4 font-semibold">Due Date & Countdown</th>
            <th className="py-3 px-4 font-semibold">Priority</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold">Progress</th>
            <th className="py-3 px-6 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800 text-sm">
          {assignments.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-1 text-slate-300">search_off</span>
                <p className="font-medium text-sm">No assignments match your current filters.</p>
              </td>
            </tr>
          ) : (
            assignments.map((item) => {
              const isChecked = selectedIds.includes(item.id);
              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onEdit && onEdit(item)}
                >
                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onSelectOne(item.id)}
                      className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                      aria-label="Select assignment"
                    />
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-brand-600 shrink-0 mt-0.5 border border-indigo-100">
                        <span className="material-symbols-outlined text-[18px]">
                          {item.course?.icon || 'storage'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate max-w-md">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-600 border border-slate-200">
                            {item.course?.code || 'CS 301'}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {item.course?.instructor || item.tag || 'Academic Module'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-900 font-medium text-xs">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                      <span>{item.dueDateDisplay || 'Upcoming'}</span>
                    </div>
                    {item.effort && (
                      <span className="font-mono text-[11px] text-slate-400 block mt-0.5">
                        Effort: {item.effort}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getPriorityBadge(item.priority)}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5 w-28">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            item.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-brand-600'
                          }`}
                          style={{ width: `${item.progress ?? (item.status === 'COMPLETED' ? 100 : 0)}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-xs text-slate-500">
                        {item.progress ?? (item.status === 'COMPLETED' ? 100 : 0)}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(item.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          item.status === 'COMPLETED'
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title={item.status === 'COMPLETED' ? 'Mark Pending' : 'Mark Completed'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {item.status === 'COMPLETED' ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-indigo-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit Assignment"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete assignment "${item.title}"?`)) {
                            onDelete(item.id);
                          }
                        }}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Delete Assignment"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
