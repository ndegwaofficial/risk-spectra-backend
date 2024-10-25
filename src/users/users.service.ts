import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

// src/users/users.service.ts
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async create(user: Partial<User>): Promise<User> {
        try {
            const newUser = this.usersRepository.create(user);
            return await this.usersRepository.save(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }
}