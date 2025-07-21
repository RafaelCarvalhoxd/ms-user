import { User } from '@/entity/user';
import { IUserRepository } from '@/interfaces/repository/user';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async create(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
    phoneNumber: string,
    gender: 'M' | 'F',
  ): Promise<User> {
    const user = new User(null, name, email, password, new Date(), new Date(), birthDate, phoneNumber, gender);
    return await this.userRepository.create(user);
  }
}
