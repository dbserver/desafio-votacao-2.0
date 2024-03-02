import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import PollsOptionsUsers from "./PollsOptionsUsers.entity";
import Polls from "./Polls.entity";

@Entity()
export default class PollsOptions extends ExtendedBaseEntity<PollsOptions> {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id!: number
    
    @Column({
        type: 'varchar',
        length: 250
    })
    option!: string

    @Column({
        type: 'int',
        default: 0
    })
    selectCount!: number

    @Column("int", { width: 11, unsigned: true })
    pollId!: number
    
    @ManyToOne(() => Polls, (polls) => polls.pollsOptions, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "pollId", referencedColumnName: "id" })
    poll!: Polls

    @OneToMany(() => PollsOptionsUsers, (pollsOptionsUsers) => pollsOptionsUsers.pollOption)
    pollsOptionsUsers?: PollsOptionsUsers[]  

    @CreateDateColumn({
        type: "datetime",
        name: "created_at"
    })
    readonly createdAt!: Date

    @UpdateDateColumn({
        type: "datetime",
        name: "updated_at"
    })
    readonly updatedAt!: Date
}