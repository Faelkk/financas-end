import { UserCreateDataModel } from "../../../types/user/user";
import { CustomError } from "../../utils/customErrorClass";

export interface createUserModelDto {
  data: UserCreateDataModel;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createUserModel({ data }: createUserModelDto) {
  const { email, username, password, name } = data;

  if (!email || !username || !password || !name) {
    throw new CustomError("All fields are required", 400);
  }

  if (!emailRegex.test(email)) {
    throw new CustomError("Email is not correct", 400);
  }

  if (password.length < 8) {
    throw new CustomError("Password must be at least 8 digits", 400);
  }

  return { email, username, password, name };
}
