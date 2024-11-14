import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function EditableField({ value, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border rounded px-2 py-1 w-20 text-center"
        />
        <button onClick={handleSave} className="ml-2 text-green-500">
          <FaCheck />
        </button>
        <button onClick={handleCancel} className="ml-2 text-red-500">
          <FaTimes />
        </button>
      </div>
    );
  }

  return (
    <div onClick={handleEdit} className="cursor-pointer">
      {value}
    </div>
  );
}

export default EditableField;
