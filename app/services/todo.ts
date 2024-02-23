import request from "./request";

export const getList = (params: any) => request.get('/todos', { params })

export const createTodo = (data: any) => request.post('/todos', data)

export const putTodo = (id: string, data: any) => {
  return request.put(`/todos/${id}`, data, { headers: { 'Content-Type': 'application/json' }})
}

export const deleteTodo = (id: string) => {
  return request.delete(`/todos/${id}`)
}