const sql = require("mssql");
import {
  UserCreateDataModel,
  UserGetInfoModel,
  UserLoginDataModel,
} from "../../../types/user/user";
import { executeQuery } from "../../config/dbConfig";

export const userRepository = {
  async createUser({ email, username, password, name }: UserCreateDataModel) {
    const query = `
    INSERT INTO Users (id, email, username, password, name)
    VALUES (NEWID(), '${email}', '${username}', '${password}', '${name}')
  `;
    const user = await executeQuery(query);
    return user[0] as any;
  },
  async getUserInfo({ userId }: UserGetInfoModel) {
    const query = `
      SELECT * FROM Users
      WHERE id = '${userId}'
    `;
    const user = await executeQuery(query);
    return user[0] as any;
  },
  async loginUser({ email, password }: UserLoginDataModel) {
    const query = `
      SELECT * FROM Users
      WHERE email = '${email}' AND password = '${password}'
    `;
    const user = await executeQuery(query);
    return user[0] as any;
  },
  async findUniqueUserByEmail(email: string) {
    const query = `
      SELECT * FROM Users
      WHERE email = '${email}'
    `;
    const userAlreadyExists = await executeQuery(query);
    return userAlreadyExists[0] as any;
  },
};
