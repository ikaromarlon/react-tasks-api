import React, { createContext, useState, useEffect } from "react";
import { Task, CreateTask } from "../models/Task";
import { createTaskRequest, getTasksRequest } from "../api/tasksApi";

interface TaskContextValue {
  tasks: Task[],
  createTask: (task: CreateTask) => Promise<void>
}
export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {}
})

interface Props {
  children: React.ReactNode
}
export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [ tasks, setTasks ] = useState<Task[]>([])

  useEffect(() => {
    getTasksRequest()
      .then(data => setTasks(data))
  }, [])

  const createTask = async (task: CreateTask) => {
    const newTask = await createTaskRequest(task)
    setTasks([...tasks, newTask])
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}