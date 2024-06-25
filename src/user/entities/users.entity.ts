import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, length: 60 })
  password: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ default: 'user' })
  role: string;
}
