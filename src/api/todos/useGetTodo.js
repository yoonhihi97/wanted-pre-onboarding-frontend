import customAxios from "api/ customAxios";

const getTodo = async (todo) => {
  const result = await customAxios.get("/todos", { todo });
  return result;
};

export default getTodo;
