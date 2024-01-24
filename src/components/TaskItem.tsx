import { useTasks } from "../context/useTasks";
import { Task } from "../models/Task";

interface Props {
  task: Task
}
function TaskItem({ task }: Props) {

  const { deleteTask } = useTasks()

  return (
    <div key={task._id} className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button>U</button>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this task?')){
            await deleteTask(task._id) 
          }
        }}>D</button>
      </div>
    </div>
  );
}

export default TaskItem;