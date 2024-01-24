import { useTasks } from "../context/useTasks";
import { Task } from "../models/Task";
import { IoCheckmarkDone, IoTrash } from "react-icons/io5";

interface Props {
  task: Task
}
function TaskItem({ task }: Props) {

  const { deleteTask, updateTask } = useTasks()

  return (
    <div key={task._id} className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        <IoCheckmarkDone
          onClick={async () => {
            await updateTask(task._id, {
              done: !task.done
            }) 
          }}
          className={task.done ? "text-green-500" : "text-gray-500"}
        />
        <IoTrash
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this task?')){
              await deleteTask(task._id) 
            }
          }}
        />
      </div>
    </div>
  );
}

export default TaskItem;