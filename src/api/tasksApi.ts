import { api } from "../config"
import { CreateTask, UpdateTask } from "../models/Task"

const headers = {
  'Content-Type': 'application/json'
}

export const createTaskRequest = async (data: CreateTask): Promise<Response> => fetch(`${api.url}/tasks`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
})

export const getTasksRequest = async (): Promise<Response> => fetch(`${api.url}/tasks`, {
  method: 'GET',
  headers
})

export const updateTaskRequest = async (id: string, data: UpdateTask ): Promise<Response> => fetch(`${api.url}/tasks/${id}`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify(data)
})

export const deleteTaskRequest = async (id: string): Promise<Response> => fetch(`${api.url}/tasks/${id}`, {
  method: 'DELETE',
  headers
})