import { db } from '@/config/db/db';
import { users } from '@/config/db/schemas/user';
import { User } from '@/entity/user';
import { IUserRepository } from '@/interfaces/repository/user';
import { eq } from 'drizzle-orm';
import { userMapper } from './mapper/user';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
        password: users.passwordHash,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        birthDate: users.birthDate,
        phoneNumber: users.phone_number,
        gender: users.gender,
      })
      .from(users)
      .where(eq(users.email, email))
      .execute();

    if (result.length === 0) {
      return null;
    }

    return userMapper({
      id: result[0].id,
      fullName: result[0].name,
      email: result[0].email,
      passwordHash: result[0].password,
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
      birthDate: new Date(result[0].birthDate),
      phoneNumber: result[0].phoneNumber,
      gender: result[0].gender,
    });
  }

  async create(user: User): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        fullName: user.getName(),
        email: user.getEmail(),
        passwordHash: user.getPassword(),
        birthDate: user.getBirthDate().toISOString().split('T')[0],
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
        phone_number: user.getPhoneNumber(),
        gender: user.getGender(),
      })
      .returning({
        id: users.id,
        name: users.fullName,
        email: users.email,
        password: users.passwordHash,
        birthDate: users.birthDate,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        phoneNumber: users.phone_number,
        gender: users.gender,
      })
      .execute();

    return userMapper({
      id: result[0].id,
      fullName: result[0].name,
      email: result[0].email,
      passwordHash: result[0].password,
      birthDate: new Date(result[0].birthDate),
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
      phoneNumber: result[0].phoneNumber,
      gender: result[0].gender,
    });
  }
}
