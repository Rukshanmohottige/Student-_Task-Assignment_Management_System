import React from 'react';

export default function SprintProgress({ stats }) {
  const sprintName = stats?.sprintName || 'Sprint 2 / Midterm';
  const overallProgress = stats?.overallProgress ?? 67;
  const total = stats?.totalAssignments ?? 12;
  const completed = stats?.completedTasks ?? 8;
  const courses = stats?.courseBreakdown || [];

  return (
    <section className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.05)] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-brand-600">flag</span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Semester Sprint Progress</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {completed} of {total} assignments submitted across mid-term deliverables
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="font-mono text-xs text-slate-500 font-semibold uppercase">{sprintName}</span>
          <span className="text-base font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200">
            {overallProgress}%
          </span>
        </div>
      </div>

      {/* Segmented Master Bar */}
      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
        <div
          className="h-full bg-brand-600 transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
          title={`Completed: ${overallProgress}%`}
        ></div>
        <div
          className="h-full bg-amber-400/80 transition-all duration-500"
          style={{ width: `${Math.min(20, 100 - overallProgress)}%` }}
          title="In Progress"
        ></div>
        <div
          className="h-full bg-slate-200 transition-all duration-500"
          style={{ width: `${Math.max(0, 100 - overallProgress - 20)}%` }}
          title="Upcoming"
        ></div>
      </div>

      {/* Subject Distribution Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {courses.map((course) => {
          const isDone = course.totalAssignments > 0 && course.completedAssignments === course.totalAssignments;
          return (
            <div
              key={course.id || course.code}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: course.color || '#4f46e5' }}
                ></span>
                <div className="truncate">
                  <p className="font-semibold text-xs text-slate-900 truncate">{course.code}</p>
                  <p className="text-[11px] text-slate-500 truncate">{course.name}</p>
                </div>
              </div>
              <span className={`font-mono text-xs font-bold ml-2 shrink-0 ${isDone ? 'text-emerald-600' : 'text-slate-700'}`}>
                {course.completedAssignments}/{course.totalAssignments} {isDone && '• 100%'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
