import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
@Entity()
export class basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
