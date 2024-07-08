export interface UserCreateDataModel {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface UserLoginDataModel {
  email: string;
  password: string;
}

export interface UserGetInfoModel {
  userId: string;
}
