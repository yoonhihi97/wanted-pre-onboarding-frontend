import customAxios from "api/ customAxios";

const createTodo = async (todo) => {
  const result = await customAxios.post("/todos", { todo });
  return result;
};

export default createTodo;
