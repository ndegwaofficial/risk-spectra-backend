// src/court-cases/entities/court-case.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ClaimedAmount } from 'src/claimed-amounts/entities/claimed-amount.entity';

@Entity()
export class CourtCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  assignedLawyer: User;

  @Column('decimal')
  claimedAmount: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  courtDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => ClaimedAmount, claimedAmount => claimedAmount.courtCase)
  claimedAmounts: ClaimedAmount[];
}