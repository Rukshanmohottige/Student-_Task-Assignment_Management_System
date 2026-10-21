import React, { useState, useEffect } from 'react';

export default function PomodoroWidget() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      alert('Focus Block Completed! Great job studying.');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-indigo-100/40 border border-indigo-200/70 shadow-[0_1px_3px_rgba(79,70,229,0.06)] relative overflow-hidden flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-brand-700">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          <span className="text-xs font-bold tracking-wider uppercase">Study Strategist</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/90 text-indigo-900 font-mono text-[11px] font-bold border border-indigo-100">
          Priority Notice
        </span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed">
        <strong className="font-semibold text-slate-900">Pro-tip:</strong> 2 high-priority assignments are due within 3 days. Focus on{' '}
        <span className="font-semibold text-brand-700 underline decoration-brand-500">Database Systems</span> first to ensure schema normalization checks clear before tomorrow night.
      </p>

      {/* Timer Section */}
      <div className="mt-1 pt-3 border-t border-indigo-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-brand-600 animate-spin" style={{ animationDuration: '4s' }}>
            timer
          </span>
          <span className="font-mono text-base font-extrabold text-slate-900">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTimer}
            className={`py-1.5 px-3 rounded-lg font-semibold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-brand-600 hover:bg-brand-700 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            <span>{isActive ? 'Pause' : 'Start 25m Focus Block'}</span>
          </button>
          {secondsLeft < 25 * 60 && (
            <button
              type="button"
              onClick={resetTimer}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
