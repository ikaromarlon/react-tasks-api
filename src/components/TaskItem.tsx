import { Task } from "../models/Task";

interface Props {
  task: Task
}

function TaskItem({ task }: Props) {
  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button>U</button>
        <button>D</button>
      </div>
    </div>
  );
}

export default TaskItem;