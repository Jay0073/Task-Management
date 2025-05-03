import React, { useState, useEffect } from "react";
import Select from "react-select";
import TaskCard from "../components/TaskCard";
import axios from "axios";

const TaskPage = () => {
  const tagOptions = [
    { value: "Work", label: "Work", color: "#1E90FF" },
    { value: "Study", label: "Study", color: "#32CD32" },
    { value: "Personal", label: "Personal", color: "#FF8C00" },
    { value: "Urgent", label: "Urgent", color: "#FF4500" },
    { value: "Others", label: "Others", color: "#8A2BE2" },
  ];

  const [tasks, setTasks] = useState([]);
  const [taskCounter, setTaskCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const [searchTags, setSearchTags] = useState([]);

  // Fetch all tasks when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks/fetch");
        setTasks(response.data); // Store fetched tasks in state
        console.log(response.data); // Log the fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        alert("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        tags: task.tags,
      });
    } else {
      setEditingTask(null);
      setFormData({ title: "", description: "", tags: [] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions.map((opt) => opt.value),
    }));
  };

  const handleSearchTagChange = (selectedOptions) => {
    setSearchTags(selectedOptions.map((opt) => opt.value));
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        // Send a PUT request to edit the task
        const response = await axios.put(
          `http://localhost:3000/tasks/edit/${editingTask.id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? response.data : task
          )
        );
      } else {
        // Send a POST request to create a new task
        const response = await axios.post(
          "http://localhost:3000/tasks/create",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTasks((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting task:", error.message);
      alert("Failed to submit task. Please try again.");
    }
  };

  const handleEdit = (task) => {
    openModal(task);
  };

  const handleDelete = async (taskId) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`http://localhost:3000/tasks/delete/${taskId}`);
      // Remove the deleted task from the local state
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error.message);
      alert("Failed to delete task. Please try again.");
    } finally {
      window.location.reload();
    }
  };

  const filteredTasks = searchTags.length
    ? tasks.filter((task) => task.tags.some((tag) => searchTags.includes(tag)))
    : tasks;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 mx-20">
        <h1 className="text-3xl font-bold">Tasks Page</h1>
        <div className="flex items-center space-x-4">
          {/* Search Tags */}
          <div className="w-64">
            <Select
              isMulti
              options={tagOptions}
              value={tagOptions.filter((opt) => searchTags.includes(opt.value))}
              onChange={handleSearchTagChange}
              placeholder="Search by Tags"
            />
          </div>
          {/* Create Card Button */}
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
          >
            Create Card
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No tasks found</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-4 mx-3">
          {filteredTasks.map((task) => (
            <div key={task._id} className="break-inside-avoid">
              <TaskCard
                task={task}
                tagOptions={tagOptions}
                onEdit={handleEdit}
                onDelete={() => {
                  handleDelete(task._id);
                  console.log("Deleted task with ID:", task._id);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative transition-all duration-300">
            
          
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">
              {editingTask ? "Edit Task" : "Create Task"}
            </h2>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-5xl mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <Select
                isMulti
                options={tagOptions}
                value={tagOptions.filter((opt) =>
                  formData.tags.includes(opt.value)
                )}
                onChange={handleTagChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                onClick={() =>
                  setFormData({ title: "", description: "", tags: [] })
                }
              >
                Clear
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleSubmit}
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
