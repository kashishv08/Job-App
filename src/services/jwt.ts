import jwt from "jsonwebtoken";
type data = {
  id: String;
};
export const generateToken = (data: data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY as string);
  return token;
};

export const verifyToken = (token: string) => {
  const data = jwt.verify(token, process.env.TOKEN_KEY as string);
  return data;
};
