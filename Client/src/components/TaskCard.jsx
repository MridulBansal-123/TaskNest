import { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

/**
 * Task Card Component — Cream & Purple Theme
 */
const TaskCard = ({ task, onUpdate, onDelete, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({
      title: task.title,
      description: task.description || "",
    });
  };

  const handleSave = async () => {
    try {
      await onUpdate(task.id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const isCompleted = task.status === "COMPLETED";

  // Status Accent Colors
  const accentColor = isCompleted
    ? "border-l-[#4CAF50]" // Green for success
    : "border-l-[#FFB6C1]"; // Pink for priority/pending

  return (
    <Card className={`border-l-4 ${accentColor} hover:shadow-md transition-all duration-200 animate-fade-in-up bg-white`}>
      <div className="flex items-start justify-between gap-4">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[#4A4A4A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] outline-none transition-all duration-200"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                rows="3"
                placeholder="Description (optional)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[#4A4A4A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] outline-none resize-none transition-all duration-200"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="success" className="text-xs py-1.5 px-3">
                  Save
                </Button>
                <Button onClick={handleCancel} variant="secondary" className="text-xs py-1.5 px-3">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                {/* Custom checkbox */}
                <button
                  onClick={() => onToggleStatus(task)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer ${isCompleted
                      ? "bg-[#4CAF50] border-[#4CAF50] shadow-sm"
                      : "border-gray-300 hover:border-[#6C63FF] bg-white"
                    }`}
                >
                  {isCompleted && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base font-bold transition-all duration-200 ${isCompleted
                        ? "text-gray-400 line-through decoration-gray-300"
                        : "text-[#4A4A4A]"
                      }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-1 text-sm leading-relaxed ${isCompleted ? "text-gray-400" : "text-[#9B9B9B]"
                        }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ${isCompleted
                          ? "bg-green-50 text-[#4CAF50] border border-green-100"
                          : "bg-pink-50 text-[#FF8DA1] border border-pink-100"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isCompleted ? "bg-[#4CAF50]" : "bg-[#FFB6C1]"
                        }`}></span>
                      {task.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1">
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-[#6C63FF] p-2 hover:bg-[#6C63FF]/5 rounded-lg transition-all duration-200 cursor-pointer"
              title="Edit task"
            >
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
              title="Delete task"
            >
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
