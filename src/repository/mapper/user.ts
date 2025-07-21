import { User } from '@/entity/user';

export function userMapper(data: {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  birthDate: Date;
  phoneNumber: string;
  gender: string;
}): User {
  return new User(
    data.id,
    data.fullName,
    data.email,
    data.passwordHash,
    data.createdAt,
    data.updatedAt,
    data.birthDate,
    data.phoneNumber,
    data.gender,
  );
}
