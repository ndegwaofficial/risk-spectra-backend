import { CourtCase } from "src/court-cases/entities/court-case.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    LAWYER = 'lawyer',
    CLIENT = 'client',
    USER = 'user',

}
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

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT
    })
    role: UserRole;

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