import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
