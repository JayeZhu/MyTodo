import request from "./request";

export const getList = (params: any) => request.get('/todos', { params })

export const createTodo = (data: any) => request.post('/todos', data)

export const putTodo = (id: string, data: any) => {
  console.log({ id, data }); 
  return request.put(`/todos/${id}`, data)
}