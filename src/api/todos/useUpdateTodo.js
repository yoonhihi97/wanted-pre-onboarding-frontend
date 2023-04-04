import { customAxios } from "api/ customAxios";

const updateTodo = async (id, todo, isCompleted) => {
  const result = await customAxios.put(`/todos/${id}`, { todo, isCompleted });
  return result;
};

export default updateTodo;
