import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, tagOptions }) => {
  const getTagColor = (tag) => {
    const found = tagOptions.find((opt) => opt.value === tag);
    return found ? found.color : "#666";
  };

  return (
    <div className="p-4 border rounded shadow-2xl bg-cream break-inside-avoid">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold text-gray-800">{task.title}</h3>
        <div className="flex space-x-3">
          <button
            className="text-blue-500 hover:text-blue-700 text-2xl"
            onClick={() => onEdit(task)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700 text-xl"
            onClick={() => onDelete(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            style={{ backgroundColor: getTagColor(tag) }}
            className="px-2 py-1 text-sm font-medium text-white rounded-full"
          >
            {tag.trim()}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 whitespace-pre-wrap">
        {task.description}
      </p>
    </div>
  );
};

export default TaskCard;
