import React, { createContext, useState, useEffect } from "react";
import { Task, CreateTask } from "../models/Task";
import { createTaskRequest, deleteTaskRequest, getTasksRequest } from "../api/tasksApi";

interface TaskContextValue {
  tasks: Task[]
  createTask: (task: CreateTask) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}
export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {}
})

interface Props {
  children: React.ReactNode
}
export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [ tasks, setTasks ] = useState<Task[]>([])

  useEffect(() => {
    getTasksRequest()
      .then(res => res.json())
      .then(tasks => setTasks(tasks))
  }, [])

  const createTask = async (data: CreateTask) => {
    const res = await createTaskRequest(data)
    const task = await res.json()
    setTasks([...tasks, task])
  }

  const deleteTask = async (id: string) => {
    const res = await deleteTaskRequest(id)
    if (res.status === 204) {
      setTasks(tasks.filter(task => task._id !== id))
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}