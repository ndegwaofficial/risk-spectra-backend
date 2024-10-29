// src/claimed-amounts/entities/claimed-amount.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CourtCase } from '../../court-cases/entities/court-case.entity';

@Entity()
export class ClaimedAmount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CourtCase, courtCase => courtCase.claimedAmounts)
  courtCase: CourtCase;

  @Column('decimal')
  amount: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  claimDate: Date;
}