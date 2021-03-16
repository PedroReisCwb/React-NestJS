/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: number;
  username: string;
  created: Date;
  token?: string;
}
