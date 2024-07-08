import { userRepository } from "../../../shared/repository/user/userRepository";
import { CustomError } from "../../../shared/utils/customErrorClass";
import {
  UserCreateDataModel,
  UserGetInfoModel,
  UserLoginDataModel,
} from "../../../types/user/user";
import { compare, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const usersService = {
  async createUser({ email, username, password, name }: UserCreateDataModel) {
    const userAlreadyExists = await userRepository.findUniqueUserByEmail(email);

    if (userAlreadyExists && userAlreadyExists.email) {
      throw new CustomError(
        "Email ja esta sendo utilizado por outra conta.",
        409
      );
    }

    const hashedPassword = hashSync(password, 10);

    const { user } = await userRepository.createUser({
      email,
      username,
      password: hashedPassword,
      name,
    });

    if (!user) {
      throw new CustomError("Erro ao criar usuario", 500);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return accessToken;
  },

  async getUserInfo({ userId }: UserGetInfoModel) {
    const user = await userRepository.getUserInfo({ userId });

    if (!user) {
      throw new CustomError("Erro ao pegar informações do usuario", 500);
    }

    return user;
  },
  async loginUser({ email, password }: UserLoginDataModel) {
    const user = await userRepository.findUniqueUserByEmail(email);

    if (!user) {
      throw new CustomError("Verifique seus dados novamente", 400);
    }
    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      throw new CustomError("Senha incorreta", 400);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return accessToken;
  },
};
