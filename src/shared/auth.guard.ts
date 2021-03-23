/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger('AuthGuard');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      this.logger.log('Error authentication.');
      return false;
    }
    
    request.user = await this.validateToken(request.headers.authorization);
    
    return true;
  }

  async validateToken(auth: string) {
    const token = auth.split(' ')[1];
    const authorizationType = auth.split(' ')[0];

    //this.logger.log(`Token: .${ token }`);
    //this.logger.log(`authorizationType: .${ authorizationType }`);

    if (authorizationType !== 'Bearer') {
      this.logger.log(`Error type authorization: Bearer <> ${ authorizationType }`);
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      return decoded;
    }catch(err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}