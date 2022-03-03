import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  product_id: number;

  @Column({ nullable: true })
  basket_id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  amount: number;
}
