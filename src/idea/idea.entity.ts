/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn() created: Date;

  @Column('text') idea: string;

  @Column('text') description: string;
}
