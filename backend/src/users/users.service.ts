import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user with hashed password
   */
  async create(data: Partial<User>): Promise<User> {
    // Hash the password before saving
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Find a user by ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Update user details (with password hashing if password is updated)
   */
  async update(id: number, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  /**
   * Remove a user by ID
   */
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Hash a password
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare plain text password with hashed password
   */
  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
