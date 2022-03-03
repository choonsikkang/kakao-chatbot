import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image_url: string;
}
