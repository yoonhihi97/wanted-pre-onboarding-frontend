import { customAxios } from "api/ customAxios";

const deleteTodo = async (id) => {
  const result = await customAxios.delete(`/todos/${id}`);
  return result;
};

export default deleteTodo;
