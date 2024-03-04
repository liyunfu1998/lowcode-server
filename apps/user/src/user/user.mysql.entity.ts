import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum UserStatus {
  disabled = 0,
  enabled = 1,
}

@Entity()
export class User {
  // 自增主键
  @PrimaryGeneratedColumn()
  id?: number;

  // 普通类型
  @Column({ default: null })
  name: string;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  avatar?: string;

  @Column({ default: null })
  mobile?: string;

  @Column({ default: null })
  enName?: string;

  @Column({ default: null })
  departmentName?: string;

  @Column({ default: null })
  departmentId?: number;

  @Column({ default: UserStatus.enabled })
  status?: UserStatus;

  @UpdateDateColumn()
  updateTime?: string;

  @CreateDateColumn()
  createTime?: string;
}
