import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  basket_id: number;

  @Column()
  name: string;

  @Column()
  amount: number;
}
