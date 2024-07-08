import { Request, Response } from "express";
import { createUserModel } from "../../../shared/model/user/createUser";
import {
  UserCreateDataModel,
  UserLoginDataModel,
} from "../../../types/user/user";

import { handleError } from "../../../shared/utils/errorHandler";
import { usersService } from "../../services/user/usersService";
import { activeUserId } from "../../../shared/helpers/activeUserId";
import { loginUserModel } from "../../../shared/model/user/loginUserModel";

export const userController = {
  async createUser(req: Request, res: Response) {
    const data: UserCreateDataModel = req.body;
    try {
      const { email, username, password, name } = createUserModel({ data });

      const user = await usersService.createUser({
        email,
        username,
        password,
        name,
      });

      return res.status(200).send(user);
    } catch (error) {
      return handleError(error, res);
    }
  },

  async getUserInfo(req: Request, res: Response) {
    const { userId } = await activeUserId(req);
    try {
      const user = await usersService.getUserInfo({
        userId,
      });

      return res.status(200).send(user);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async loginUser(req: Request, res: Response) {
    const data: UserLoginDataModel = req.body;
    try {
      const { email, password } = loginUserModel({ data });

      const user = await usersService.loginUser({ email, password });

      return res.status(200).send(user);
    } catch (error) {
      return handleError(error, res);
    }
  },
};
