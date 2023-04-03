import { customAxios } from "api/ customAxios";

const login = async (email, password) => {
  const { data } = await customAxios.post("/auth/signin", { email, password });
  return data;
};

export default login;
