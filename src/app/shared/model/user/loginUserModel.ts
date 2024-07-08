import { UserLoginDataModel } from "../../../types/user/user";
import { CustomError } from "../../utils/customErrorClass";

export interface loginUserModelDto {
  data: UserLoginDataModel;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function loginUserModel({ data }: loginUserModelDto) {
  const { email, password } = data;

  if (!email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  if (!emailRegex.test(email)) {
    throw new CustomError("Email is not correct", 400);
  }

  if (password.length < 8) {
    throw new CustomError("Password must be at least 8 digits", 400);
  }

  return { email, password };
}
