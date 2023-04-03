import { customAxios } from "api/ customAxios";

const signup = async (email, password) => {
  const result = await customAxios.post("/auth/signup", { email, password });
  return result;
};

export default signup;
