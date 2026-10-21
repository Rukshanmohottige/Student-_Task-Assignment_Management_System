import React, { useState, useEffect } from 'react';

export default function AssignmentModal({ isOpen, onClose, onSave, initialData, courses = [] }) {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('CS 301');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [effort, setEffort] = useState('4 hours');
  const [priority, setPriority] = useState('MEDIUM');
  const [status, setStatus] = useState('PENDING');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentSize, setAttachmentSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCourseCode(initialData.course?.code || 'CS 301');
      setDueDate(initialData.dueDate ? initialData.dueDate.substring(0, 16) : '');
      setEffort(initialData.effort || '4 hours');
      setPriority(initialData.priority || 'MEDIUM');
      setStatus(initialData.status || 'PENDING');
      setDescription(initialData.description || '');
      setAttachmentName(initialData.attachmentName || '');
      setAttachmentSize(initialData.attachmentSize || '');
    } else {
      // Default new assignment values matching mock
      setTitle('Distributed Consensus & Raft Protocol Engine');
      setCourseCode(courses[0]?.code || 'CS 301');
      // Set default tomorrow night
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      setDueDate(tomorrow.toISOString().substring(0, 16));
      setEffort('6 hours');
      setPriority('MEDIUM');
      setStatus('PENDING');
      setDescription('Implement state machine safety invariants in Go. Submit unit test suites and PDF design report via GitHub Classroom.');
      setAttachmentName('raft-consensus-specification.pdf');
      setAttachmentSize('1.4 MB');
    }
  }, [initialData, isOpen, courses]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an assignment title');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        courseCode: courseCode === 'new_course' ? newCourseCode.trim() : courseCode,
        courseName: courseCode === 'new_course' ? newCourseName.trim() : undefined,
        dueDate: dueDate || undefined,
        effort: effort.trim(),
        priority,
        status,
        description: description.trim(),
        attachmentName: attachmentName || undefined,
        attachmentSize: attachmentSize || undefined,
      };

      await onSave(payload, initialData?.id);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save assignment: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setAttachmentSize(`${sizeMb} MB`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      id="modal-container"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transform transition-all border border-slate-200"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-start justify-between bg-white border-b border-slate-100 shrink-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-brand-600 border border-indigo-100">
                <span className="material-symbols-outlined text-[20px]">
                  {initialData ? 'edit_note' : 'add_task'}
                </span>
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {initialData ? 'Edit Assignment' : 'Add New Assignment'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 pl-10">
              Create and schedule an academic milestone, lab report, or coursework project.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form id="assignment-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 flex flex-col gap-5">
          {/* Field 1: Assignment Title */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1" htmlFor="assignment-title">
                Assignment Title <span className="text-red-500 font-bold">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Max 80 chars</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                edit_note
              </span>
              <input
                id="assignment-title"
                name="title"
                type="text"
                required
                maxLength={80}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Systems Term Paper"
                className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
              />
            </div>
            {title.length > 5 && (
              <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Valid assignment title
              </p>
            )}
          </div>

          {/* Field 2: Course / Subject Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1" htmlFor="course-select">
              Course / Subject <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                menu_book
              </span>
              <select
                id="course-select"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full h-11 pl-11 pr-10 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 appearance-none cursor-pointer transition-all outline-none"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
                <option value="new_course" className="font-semibold text-brand-600">
                  + Add new course...
                </option>
              </select>
              <span className="material-symbols-outlined absolute right-3 text-slate-400 text-[20px] pointer-events-none">
                expand_more
              </span>
            </div>

            {courseCode === 'new_course' && (
              <div className="grid grid-cols-2 gap-3 mt-2 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <input
                  type="text"
                  placeholder="Code (e.g. CS 450)"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="h-9 px-3 text-xs rounded-lg border border-slate-200 bg-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Course Name (e.g. Operating Systems)"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="h-9 px-3 text-xs rounded-lg border border-slate-200 bg-white"
                  required
                />
              </div>
            )}
          </div>

          {/* Field 3: 2-Column Grid (Due Date & Time + Estimated Effort) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1" htmlFor="due-date">
                Due Date & Time <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                  event
                </span>
                <input
                  id="due-date"
                  type="datetime-local"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-400">Campus Standard Time</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="effort-hours">
                  Estimated Effort
                </label>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                  hourglass_empty
                </span>
                <input
                  id="effort-hours"
                  type="text"
                  placeholder="e.g. 4 hours"
                  value={effort}
                  onChange={(e) => setEffort(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-400">Recommended for Pomodoro sync</span>
            </div>
          </div>

          {/* Field 4: Priority Level Segmented Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              Priority Level <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
              {['LOW', 'MEDIUM', 'HIGH'].map((p) => {
                const isSelected = priority === p;
                const dotColor = p === 'HIGH' ? 'bg-red-500' : p === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500';
                const label = p.charAt(0) + p.slice(1).toLowerCase();
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 5: Initial Status Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Initial Status</label>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status"
                  value="PENDING"
                  checked={status === 'PENDING'}
                  onChange={() => setStatus('PENDING')}
                  className="w-4 h-4 text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-800">Pending / In Progress</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status"
                  value="COMPLETED"
                  checked={status === 'COMPLETED'}
                  onChange={() => setStatus('COMPLETED')}
                  className="w-4 h-4 text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-800">Completed</span>
              </label>
            </div>
          </div>

          {/* Field 6: Description & Requirements */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="assignment-notes">
                Description & Requirements
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {description.length} / 500
              </span>
            </div>
            <textarea
              id="assignment-notes"
              rows={3}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add assignment rubric, submission format (PDF/GitHub), notes, or milestone breakdown..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none resize-none"
            />
          </div>

          {/* Field 7: Attachments / References */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Attachments & References
            </span>

            <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-slate-50 transition-colors cursor-pointer text-center group">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-brand-600 mb-1 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-semibold text-brand-600">Click to upload syllabus rubric</span> or drag & drop
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOCX, ZIP or TXT (up to 25MB)</p>
            </label>

            {attachmentName && (
              <div className="flex items-center justify-between p-2.5 px-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-brand-600 text-[18px]">attachment</span>
                  <span className="font-semibold text-slate-900 truncate">{attachmentName}</span>
                  <span className="text-[11px] text-slate-500 shrink-0">{attachmentSize}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAttachmentName('');
                    setAttachmentSize('');
                  }}
                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove attachment"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
          </div>

          {/* Sync indicator info */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
            <span className="material-symbols-outlined text-brand-600 text-[18px] shrink-0 mt-0.5">info</span>
            <div>
              <p className="font-semibold text-slate-800">Automatic Calendar & Notification Sync</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                TaskFlow will trigger push alerts 24 hours prior to deadline and allocate two 45-min Pomodoro sessions.
              </p>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
            <span>Encrypted academic storage</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="assignment-form"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSubmitting ? 'progress_activity' : 'check'}
              </span>
              <span>{isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Save Assignment'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
