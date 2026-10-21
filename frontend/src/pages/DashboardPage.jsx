import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import SprintProgress from '../components/SprintProgress';
import DeadlinesList from '../components/DeadlinesList';
import PomodoroWidget from '../components/PomodoroWidget';
import SubmissionsWidget from '../components/SubmissionsWidget';
import StudyPodWidget from '../components/StudyPodWidget';
import AssignmentModal from '../components/AssignmentModal';
import { api } from '../api/client';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboardStats();
      setStats(data);
      setUpcoming(data.upcomingDeadlines || []);
    } catch (err) {
      console.warn('Backend not responding yet, using initial mock data:', err);
      // Fallback display
      setStats({
        totalAssignments: 12,
        pendingTasks: 4,
        completedTasks: 8,
        urgentTasks: 2,
        overallProgress: 67,
        sprintName: 'Sprint 2 / Midterm',
        courseBreakdown: [
          { code: 'CS 301', name: 'Database Sys', totalAssignments: 3, completedAssignments: 2, color: '#3525cd' },
          { code: 'CS 340', name: 'Web Systems', totalAssignments: 4, completedAssignments: 3, color: '#005338' },
          { code: 'MAT 210', name: 'Discrete Math', totalAssignments: 3, completedAssignments: 2, color: '#565e74' },
          { code: 'ENG 105', name: 'Tech Writing', totalAssignments: 1, completedAssignments: 1, color: '#4d44e3' },
        ],
        recentSubmissions: [
          {
            id: 1,
            title: 'Computer Networks Lab 3',
            courseCode: 'CS 350',
            subtitle: 'Submitted Yesterday • Handshake Protocol',
            grade: 'A • 95%',
            feedback: 'Feedback: Excellent Wireshark capture logs',
            status: 'GRADED',
          },
          {
            id: 2,
            title: 'Software Architecture Diagram',
            courseCode: 'CS 340',
            subtitle: 'Submitted Oct 14 • Microservices C4 Model',
            grade: 'Under Review',
            feedback: 'Instructor grading in progress',
            status: 'UNDER_REVIEW',
          },
        ],
      });
      setUpcoming([
        {
          id: 1,
          title: 'Database Systems Project — Phase 2: Schema Design & SQL Queries',
          course: { code: 'CS 301', name: 'Database Systems' },
          priority: 'HIGH',
          status: 'PENDING',
          progress: 75,
          tag: 'Phase 2',
          dueDateDisplay: 'Tomorrow, 11:59 PM',
          description: 'Deliver relational normalization proof up to BCNF and benchmark index query execution plans.',
        },
        {
          id: 2,
          title: 'Web Development Coursework — Fullstack REST API',
          course: { code: 'CS 340', name: 'Web Systems Architecture' },
          priority: 'MEDIUM',
          status: 'PENDING',
          progress: 40,
          dueDateDisplay: 'Oct 24, 2025',
          description: 'Implement OAuth 2.0 PKCE auth flow with refresh tokens and OpenAPI v3 Swagger specs.',
        },
        {
          id: 3,
          title: 'Machine Learning Report — Linear & Logistic Regression Analysis',
          course: { code: 'CS 480', name: 'Machine Learning & Neural Nets' },
          priority: 'HIGH',
          status: 'PENDING',
          progress: 20,
          tag: 'Lab Report',
          dueDateDisplay: 'Oct 28, 2025',
          description: 'Comparative gradient descent optimization curves and cross-validation confusion matrixes.',
        },
        {
          id: 4,
          title: 'Discrete Mathematics Problem Set #5',
          course: { code: 'MAT 210', name: 'Discrete Mathematics' },
          priority: 'LOW',
          status: 'PENDING',
          progress: 10,
          tag: 'Problem Set',
          dueDateDisplay: 'Nov 02, 2025',
          description: 'Combinatorics proofs, pigeonhole principle applications, and graph isomorphism lemmas.',
        },
      ]);
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
    fetchDashboardData();
    fetchCourses();
  }, []);

  const handleToggleAssignment = async (id) => {
    try {
      await api.toggleAssignmentStatus(id);
      fetchDashboardData();
    } catch (err) {
      // Local optimistic update
      setUpcoming((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: item.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' }
            : item
        )
      );
    }
  };

  const handleSaveAssignment = async (payload, id) => {
    if (id) {
      await api.updateAssignment(id, payload);
    } else {
      await api.createAssignment(payload);
    }
    fetchDashboardData();
  };

  const handleOpenAddModal = () => {
    setEditingAssignment(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Header />

      <main className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col gap-8">
          {/* Top Academic Briefing Header */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Good morning, Alex 👋
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Week 8 • On Track
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Here’s your academic overview for Spring Semester 2025.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => alert('Spring 2025 Semester Schedule: Monday - Friday, 8 Courses registered.')}
                className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>Schedule</span>
              </button>
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="h-10 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-2 text-xs font-semibold group cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-90">
                  add
                </span>
                <span>Add Assignment</span>
              </button>
            </div>
          </section>

          {/* Metric Snapshot Cards (3-Column Academic Matrix) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Assignments"
              value={stats?.totalAssignments ?? 12}
              unit="milestones"
              subtitle="Across 4 active courses"
              badgeText="+2 this week"
              badgeType="default"
              icon="auto_stories"
              iconBg="bg-indigo-50 text-brand-600 border border-indigo-100"
              glowBg="bg-brand-500/5"
            />
            <MetricCard
              title="Pending Tasks"
              value={stats?.pendingTasks ?? 4}
              unit="in queue"
              subtitle="2 due within 48 hours"
              badgeText="Requires Focus"
              badgeType="urgent"
              icon="timer"
              iconBg="bg-red-50 text-red-600 border border-red-100"
              glowBg="bg-red-500/5"
            />
            <MetricCard
              title="Completed Tasks"
              value={stats?.completedTasks ?? 8}
              unit="submitted"
              subtitle="On-time rate: 100%"
              badgeText={`${stats?.overallProgress ?? 67}% Progress`}
              badgeType="success"
              icon="check_circle"
              iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
              glowBg="bg-emerald-500/5"
            />
          </section>

          {/* Semester Sprint Progress Module */}
          <SprintProgress stats={stats} />

          {/* Two-Column Workspace Core */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Upcoming Deadlines (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <DeadlinesList
                assignments={upcoming}
                onToggle={handleToggleAssignment}
                onEdit={handleOpenEditModal}
              />
            </div>

            {/* Right Column: Widgets (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <PomodoroWidget />
              <SubmissionsWidget submissions={stats?.recentSubmissions} />
              <StudyPodWidget />
            </div>
          </div>
        </div>
      </main>

      {/* Modal Dialog for Add / Edit */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAssignment}
        initialData={editingAssignment}
        courses={courses}
      />
    </div>
  );
}
