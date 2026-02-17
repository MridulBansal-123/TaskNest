import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

/**
 * Task Form Component — Cream & Purple Theme
 */
const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "PENDING",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ title: "", description: "", status: "PENDING" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title"
        error={errors.title}
        required
      />

      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#4A4A4A] mb-1.5"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          rows="4"
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[#4A4A4A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] outline-none resize-none transition-all duration-200"
        />
      </div>

      {initialData && (
        <div className="w-full">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-[#4A4A4A] mb-1.5"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[#4A4A4A] focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] outline-none transition-all duration-200"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" className="flex-1">
          {initialData ? "Update Task" : "Create Task"}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
