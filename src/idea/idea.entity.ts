/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from 'src/user/user.entity';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() update: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

  @ManyToOne(type => UserEntity, author => author.ideas) author: UserEntity;
}
