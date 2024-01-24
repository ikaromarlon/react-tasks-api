import { api } from "../config"
import { CreateTask, Task, UpdateTask } from "../models/Task"

const headers = {
  'Content-Type': 'application/json'
}

export const createTaskRequest = async (data: CreateTask): Promise<Task> => fetch(`${api.url}/tasks`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
}).then(res => res.json())

export const getTasksRequest = async (): Promise<Task[]> => fetch(`${api.url}/tasks`, {
  method: 'GET',
  headers
}).then(res => res.json())

export const updateTaskRequest = async (id: string, data: UpdateTask ): Promise<Task> => fetch(`${api.url}/tasks${id}`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify(data)
}).then(res => res.json())

export const deleteTaskRequest = async (id: string): Promise<void> => fetch(`${api.url}/tasks${id}`, {
  method: 'DELETE',
  headers
}).then(res => res.json())