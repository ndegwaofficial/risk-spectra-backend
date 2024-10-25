
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthService } from './auth.service';



@Injectable()

export class JwtAuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}



  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {

      return false;

    }

    return this.authService.validateToken(token);

  }

}
