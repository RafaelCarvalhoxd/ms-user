export interface IFindByEmailRequest {
  email: string;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  phone_number: string;
  gender: 'M' | 'F';
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
}
