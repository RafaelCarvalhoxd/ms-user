export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly birthDate: Date,
    private readonly phoneNumber: string,
    private readonly gender: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getGender(): string {
    return this.gender;
  }
}
