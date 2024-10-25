import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    try {
      console.log('Registering user:', user);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log('Hashed password:', hashedPassword);
      const newUser = await this.usersService.create({
        ...user,
        password: hashedPassword,
        role: 'user', // Add a default role
      });
      console.log('New user created:', newUser);
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error registering user');
    }
  }

  async validateToken(token: string): Promise<boolean>{
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}