import React from 'react';

export default function SubmissionsWidget({ submissions = [] }) {
  const displayItems = submissions.length > 0 ? submissions : [
    {
      id: 1,
      title: 'Computer Networks Lab 3',
      subtitle: 'Submitted Yesterday • Handshake Protocol',
      grade: 'A • 95%',
      feedback: 'Feedback: Excellent Wireshark capture logs',
      status: 'GRADED'
    },
    {
      id: 2,
      title: 'Software Architecture Diagram',
      subtitle: 'Submitted Oct 14 • Microservices C4 Model',
      grade: 'Under Review',
      feedback: 'Instructor grading in progress',
      status: 'UNDER_REVIEW'
    }
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.05)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Submissions</h2>
        <span className="material-symbols-outlined text-[20px] text-slate-400">history</span>
      </div>

      <div className="flex flex-col gap-3">
        {displayItems.map((item) => {
          const isGraded = item.status === 'GRADED';
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isGraded
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isGraded ? 'verified' : 'sync'}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{item.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold shrink-0 ${
                      isGraded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {item.grade}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                {item.feedback && (
                  <span
                    className={`text-[11px] flex items-center gap-1 mt-1 font-medium ${
                      isGraded ? 'text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isGraded ? 'comment' : 'hourglass_empty'}
                    </span>
                    {item.feedback}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => alert('Official university Grade Book integration available via Campus SIS portal.')}
        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors text-center border border-slate-200 cursor-pointer"
        type="button"
      >
        View Grade Book →
      </button>
    </div>
  );
}
