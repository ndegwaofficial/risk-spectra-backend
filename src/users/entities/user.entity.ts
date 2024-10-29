import { CourtCase } from "src/court-cases/entities/court-case.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: true })
    specialization: string;

    @Column({ nullable: true })
    yearsOfExperience: number;

    @Column({ nullable: true })
    winLossRecord: string;
    
    @Column({ default: 0 })
    casesWon: number;

    @Column({ default: 0 })
    casesLost: number;

    @OneToMany(() => CourtCase, courtCase => courtCase.assignedLawyer)
    assignedCases: CourtCase[];
}