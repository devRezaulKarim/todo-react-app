import { CgAdd } from "react-icons/cg";
import Style from "./Todos.module.css";
import Todo from "../Todo/Todo";
import { useEffect, useState } from "react";

const getOldTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  return tasks;
};

export default function Todos() {
  const [tasks, setTasks] = useState(getOldTasks);
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [target, setTarget] = useState(null);
  //Adding new task
  const addTask = (e) => {
    setTasks((preTask) => {
      const newTask = {
        taskId: Date.now(),
        isComplete: false,
        task,
      };
      return [...preTask, newTask];
    });
    setTask("");
    e.preventDefault();
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={Style.todosContainer}>
      <h1>My Todo List</h1>
      <form onSubmit={addTask} action="" className={Style.taskForm}>
        <input
          className={Style.taskInput}
          type="text"
          name=""
          id=""
          placeholder="Write Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div onClick={addTask} className={Style.submitBtnWrapper}>
          <CgAdd className={Style.submitBtnIcon} />
          <input className={Style.submitBtn} type="submit" value={"Add Task"} />
        </div>
      </form>
      <div className={Style.taskList}>
        <ol type="i">
          {[...tasks]
            .filter((task) => !task.isComplete)
            .map((task) => (
              <Todo
                key={task.taskId}
                todo={task}
                tasks={tasks}
                setTasks={setTasks}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                target={target}
                setTarget={setTarget}
              />
            ))}
        </ol>
        {[...tasks].filter((task) => task.isComplete).length > 0 && (
          <ol type="i">
            <h3 className={Style.completedHeading}>Completed Tasks</h3>
            {[...tasks]
              .filter((task) => task.isComplete)
              .map((task) => (
                <Todo
                  key={task.taskId}
                  todo={task}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))}
          </ol>
        )}
      </div>
    </div>
  );
}
