import { customAxios } from "api/ customAxios";

const login = async (email, password) => {
  const result = await customAxios.post("/auth/signin", { email, password });
  return result;
};

export default login;
