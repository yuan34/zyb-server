import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PasswordTransformer } from './password.transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 16 })
  name!: string;

  @Column({ length: 10 })
  birthday!: string;

  @Column({ length: 64, transformer: new PasswordTransformer() })
  @Exclude()
  password!: string;

  @Column({ default: 'user', length: 16 })
  role!: string;

  @Column({ name: 'last_sign_in_at' })
  lastSignInAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
