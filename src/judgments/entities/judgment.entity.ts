import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CourtCase } from '../../court-cases/entities/court-case.entity';

@Entity()
export class Judgment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CourtCase)
  @JoinColumn()
  courtCase: CourtCase;

  @Column('decimal', { precision: 10, scale: 2 })
  liabilityAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  compensationAmount: number;

  @Column()
  judgmentDetails: string;

  @Column()
  outcome: string; // 'pending' | 'won' | 'lost' | 'settled'

  @Column({ type: 'timestamp' })
  judgmentDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  liabilityFactors: Record<string, any>;

  @Column({ nullable: true })
  appealStatus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}