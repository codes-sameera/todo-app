import { useState } from "react";
import { FaTimesCircle, FaRegEdit } from "react-icons/fa";
import EditTask from "./EditTask";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);

  const onEditClicked = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div
      className={`task ${task.done ? "done" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <span>
          <FaRegEdit
            style={{ cursor: "pointer" }}
            onClick={() => onEditClicked()}
          />{" "}
          <FaTimesCircle
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </span>
      </h3>
      <p>{task.day}</p>
      {showEdit && (
        <EditTask task={task} onEdit={onEdit} onUpdateClicked={onEditClicked} />
      )}
    </div>
  );
};

export default Task;
