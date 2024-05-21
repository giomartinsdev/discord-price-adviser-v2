import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: "varchar" })
  product_link!: string;

  @Column({ type: "varchar" })
  product_name!: string;

  @Column("decimal", { precision: 12, scale: 2 })
  product_value!: number;

  @Column({ type: "varchar" })
  product_type!: string;

  constructor() {
    if (!this.product_id) {
      this.product_id = uuidv4();
    }
  }
}
