import jwt from "jsonwebtoken";
type data = {
  id: string;
};
export const generateToken = (data: data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY as string);
  return token;
};

export const verifyToken = (token: string): data => {
  const data = jwt.verify(token, process.env.TOKEN_KEY as string) as data;
  return data;
};
