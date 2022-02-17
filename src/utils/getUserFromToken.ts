import jwt from "jsonwebtoken";

export const getUserFromToken = async (token: string) => {
  try {
    return await jwt.verify(token, process.env.JWT_SIGNATURE as string);
  } catch (e) {
    return null;
  }
};
