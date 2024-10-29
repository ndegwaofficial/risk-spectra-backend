import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

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

    async findOneById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
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

    async findLawyers(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.LAWYER } });
    }

    async updateLawyerPerformance(lawyerId: number, outcome: 'won' | 'lost'): Promise<User> {
        const lawyer = await this.usersRepository.findOne({ where: { id: lawyerId } });
        if (!lawyer) {
            throw new Error('Lawyer not found');
        }

        if (outcome === 'won') {
            lawyer.casesWon++;
        } else {
            lawyer.casesLost++;
        }
            lawyer.winLossRecord = `${lawyer.casesWon}/${lawyer.casesLost}`;

        return this.usersRepository.save(lawyer);
    }
}