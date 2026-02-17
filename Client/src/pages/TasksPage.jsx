import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

/**
 * Tasks Page Component — Cream & Purple Theme
 */
const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") return true;
    return task.status === filter;
  });

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-[#4A4A4A] mb-1">My Tasks</h1>
          <p className="text-[#9B9B9B]">Manage your tasks efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Total</p>
                <p className="text-3xl font-bold text-[#4A4A4A] mt-1">{tasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#6C63FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-pink-50 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-pink-400 uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-[#4A4A4A] mt-1">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FFB6C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-50 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-400 uppercase tracking-wide">Done</p>
                <p className="text-3xl font-bold text-[#4A4A4A] mt-1">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Create */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
            {["ALL", "PENDING", "COMPLETED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${filter === f
                    ? "bg-[#6C63FF] text-white shadow-md shadow-indigo-200"
                    : "text-gray-500 hover:text-[#6C63FF] hover:bg-indigo-50"
                  }`}
              >
                {f === "ALL" ? "All" : f === "PENDING" ? "Pending" : "Completed"}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </span>
          </Button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          onUpdate={updateTask}
          onDelete={handleDeleteTask}
          onToggleStatus={toggleTaskStatus}
        />

        {/* Create Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Task"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TasksPage;
