import { ChangeEvent, FormEvent, useState } from "react";
import { useTasks } from "../context/useTasks";

function TaskForm() {
  const { createTask } = useTasks()
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    done: false
  })
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleChangeCbx = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createTask(task)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Task title"
          onChange={handleChange}
          value={task.title}
        />
        <textarea
          name="description"
          rows={3}
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Description"
          onChange={handleChange}
          value={task.description}
        ></textarea>
        <label htmlFor="inputDone" className="inline-flex items-center gap-x-2">
          <input
            type="checkbox"
            name="done"
            id="inputDone"
            className="h-5 w-5 text-indigo-600"
            checked={task.done}
            onChange={handleChangeCbx}
          />
          <span>done</span>
        </label>
        <button className="bg-indigo-500 px-3 block py-2 w-full">Save</button>
      </form>
    </div>
  );
}

export default TaskForm;