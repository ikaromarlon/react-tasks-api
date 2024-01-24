import React, { createContext, useState, useEffect } from "react";
import { Task, CreateTask, UpdateTask } from "../models/Task";
import { createTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasksApi";

interface TaskContextValue {
  tasks: Task[]
  createTask: (task: CreateTask) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  updateTask: (id: string, task: UpdateTask) => Promise<void>
}
export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {}
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

  const updateTask = async (id: string, data: UpdateTask) => {
    const res = await updateTaskRequest(id, data)
    const task = await res.json()
    setTasks(tasks.map(t => t._id === id ? { ...t, ...task} : t))
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}