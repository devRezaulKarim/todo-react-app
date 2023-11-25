/* eslint-disable react/prop-types */
import { useState } from "react";
import Style from "./Todo.module.css";
import { FaCheckCircle, FaEdit, FaSave } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function Todo({
  todo,
  tasks,
  setTasks,
  isEdit,
  setIsEdit,
  setTarget,
  target,
}) {
  const { task, taskId, isComplete } = todo;
  const [editingTask, setEditingTask] = useState("");

  //handle complete task
  const completeTask = (id) => {
    const latestTask = tasks.map((task) => {
      if (task.taskId === id) {
        task.isComplete = true;
      }
      return task;
    });
    setTasks(latestTask);
  };

  //handle edit task
  const editTask = (id) => {
    const targetedTask = tasks.reduce((pre, cur) => {
      if (cur.taskId === id) {
        pre = cur;
      }
      return pre;
    }, {}).task;
    setEditingTask(() => targetedTask);
    setIsEdit(true);
    setTarget(id);
  };

  //handle update task
  const updateTask = () => {
    const updatedTask = tasks.map((task) => {
      if (task.taskId === target) {
        return { ...task, task: editingTask };
      }
      return task;
    });
    setTasks(() => updatedTask);
    setTarget(null);
    setIsEdit(false);
  };

  //handle delete task
  const deleteTask = (id) => {
    setTasks(() => tasks.filter((task) => task.taskId !== id));
  };

  return (
    <div className={Style.task}>
      <li>
        {isEdit && target === taskId ? ( //conditionally showing the input field for editing task to update.
          <form onSubmit={updateTask} action="">
            <input
              type="text"
              name=""
              id=""
              value={editingTask}
              onChange={(e) => setEditingTask(e.target.value)}
            />
          </form>
        ) : (
          <span title={task} className={isComplete ? Style.complete : ""}>
            {task}
          </span>
        )}

        <div className={Style.taskBtns}>
          {!isComplete && target !== taskId ? (
            <button onClick={() => completeTask(taskId)} title="Complete">
              <FaCheckCircle />
            </button>
          ) : (
            ""
          )}
          {!isComplete &&
            (isEdit && target === taskId ? (
              <button onClick={updateTask} title="Save">
                <FaSave />
              </button>
            ) : (
              <button onClick={() => editTask(taskId)} title="Edit">
                <BiSolidEdit />
              </button>
            ))}
          {target !== taskId && (
            <button onClick={() => deleteTask(taskId)} title="Delete">
              <MdDelete />
            </button>
          )}
        </div>
      </li>
    </div>
  );
}
