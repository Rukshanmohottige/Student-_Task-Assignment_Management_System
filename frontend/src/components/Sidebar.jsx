import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between p-5 border-r border-slate-100">
      <div className="flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-sm shadow-primary/30">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base block">Student Portal</span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">TaskFlow OS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-primary-container text-white shadow-sm shadow-primary-container/20 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/assignments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-primary-container text-white shadow-sm shadow-primary-container/20 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">assignment</span>
            <span>My Assignments</span>
          </NavLink>

          <a
            href="#settings"
            onClick={(e) => {
              e.preventDefault();
              alert('TaskFlow Workspace Settings: Spring 2025 semester active.');
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium text-sm text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
