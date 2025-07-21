import { UserRepository } from '@/repository/user';
import { UserService } from '@/service/user';

export const makeUser = () => {
  return new UserService(new UserRepository());
};
