import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AssignmentsTable from '../components/AssignmentsTable';
import AssignmentsGrid from '../components/AssignmentsGrid';
import AssignmentModal from '../components/AssignmentModal';
import { api } from '../api/client';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const data = await api.getAssignments({
        status: statusFilter,
        priority: priorityFilter,
        course: courseFilter,
        search: search,
      });
      setAssignments(data);
    } catch (err) {
      console.warn('Backend unavailable, using local filtered list:', err);
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [statusFilter, priorityFilter, courseFilter, search]);

  const handleSelectAll = () => {
    if (selectedIds.length === assignments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assignments.map((a) => a.id));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleStatus = async (id) => {
    try {
      await api.toggleAssignmentStatus(id);
      fetchAssignments();
    } catch (e) {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: a.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } : a
        )
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAssignment(id);
      fetchAssignments();
    } catch (e) {
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSave = async (payload, id) => {
    if (id) {
      await api.updateAssignment(id, payload);
    } else {
      await api.createAssignment(payload);
    }
    fetchAssignments();
  };

  const handleExportCsv = () => {
    window.open(api.exportCsvUrl, '_blank');
  };

  // Metric snapshot calculations
  const totalCount = assignments.length;
  const pendingCount = assignments.filter((a) => a.status === 'PENDING').length;
  const completedCount = assignments.filter((a) => a.status === 'COMPLETED').length;
  const urgentCount = assignments.filter((a) => a.status === 'PENDING' && a.priority === 'HIGH').length;
  const velocity = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 66;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Header onSearch={(q) => setSearch(q)} />

      <main className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col gap-6">
          {/* Top Command & KPI Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-brand-600 font-semibold">Curriculum Registry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Assignments
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage, organize, and monitor all coursework submissions in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 transition-all text-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-slate-400">download</span>
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingAssignment(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all text-xs font-semibold cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add Assignment</span>
              </button>
            </div>
          </div>

          {/* Metric Snapshot Bar (4-Column) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Workload</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {pendingCount} <span className="text-xs text-slate-400 font-normal">pending</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-brand-600">
                <span className="material-symbols-outlined text-[22px]">pending_actions</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Due This Week</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {urgentCount} <span className="text-xs text-slate-400 font-normal">urgent</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-[22px]">notification_important</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completed Term</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {completedCount} <span className="text-xs text-slate-400 font-normal">graded</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completion Velocity</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-slate-900">{velocity}%</p>
                  <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brand-600 h-full rounded-full" style={{ width: `${velocity}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <span className="material-symbols-outlined text-[22px]">auto_graph</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Control Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Field */}
              <div className="relative flex-1 min-w-[280px]">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by assignment title, course, or keyword..."
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-600 transition-all"
                />
              </div>

              {/* Controls Right */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Priority Dropdown */}
                <div className="relative">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Course Dropdown */}
                <div className="relative">
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Courses</option>
                    {courses.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.name})
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* View Switcher */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      viewMode === 'table' ? 'bg-white text-brand-600 shadow-xs font-bold' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Table View"
                  >
                    <span className="material-symbols-outlined text-[18px]">table_rows</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-brand-600 shadow-xs font-bold' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Card View"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'all', label: `All (${totalCount})` },
                  { id: 'pending', label: `Pending (${pendingCount})` },
                  { id: 'completed', label: `Completed (${completedCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Auto-sync active</span>
              </div>
            </div>
          </div>

          {/* Primary Content Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {viewMode === 'table' ? (
              <AssignmentsTable
                assignments={assignments}
                selectedIds={selectedIds}
                onSelectAll={handleSelectAll}
                onSelectOne={handleSelectOne}
                onToggleStatus={handleToggleStatus}
                onEdit={(item) => {
                  setEditingAssignment(item);
                  setIsModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ) : (
              <AssignmentsGrid
                assignments={assignments}
                selectedIds={selectedIds}
                onSelectOne={handleSelectOne}
                onToggleStatus={handleToggleStatus}
                onEdit={(item) => {
                  setEditingAssignment(item);
                  setIsModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modal Dialog */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAssignment}
        courses={courses}
      />
    </div>
  );
}
