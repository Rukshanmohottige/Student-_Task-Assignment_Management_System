import React from 'react';

export default function Header({ user, onSearch }) {
  const currentUser = user || {
    fullName: 'Alex Chen',
    department: 'Computer Science B.S.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVhAqj2LYI_zLL8PMNsA-yWApXAgQTs9R_UDXfKsgQqyzLd0PcBg-x1rgQyeTBoxlyTRdBPxOjkuEEH94YPsyb68aDs3PgloSqJyR7n4D_jiLxheR_T3xvR2_LVVA5d9mcrPc99G6lIq35LmZitFSvqb4G78UGkklmGxK0vSB2gegnizsTqfJVpmOousKCKn13CUQpMbwuaaz3qxsROnHxQh6vXEBjswl5r2LmbaxpLHZicdt7uCVNUw'
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 px-8">
      <div className="h-16 w-full flex items-center justify-between">
        {/* Left: Brand / Term Pill */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl text-slate-900 tracking-tight">TaskFlow</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs border border-slate-200">
            Spring 2025
          </span>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              onClick={() => {
                const query = prompt('Quick search assignments:');
                if (query !== null && onSearch) onSearch(query);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              aria-label="Notifications"
              onClick={() => alert('You have 2 assignments due within 48 hours!')}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">{currentUser.fullName}</p>
              <p className="text-xs text-slate-500 mt-1 leading-none">{currentUser.department}</p>
            </div>
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
              src={currentUser.avatarUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
