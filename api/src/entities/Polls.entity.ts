import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuillOps } from "../services/interface/quill.interface";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import PollsOptions from "./PollsOptions.entity";
import PollsOptionsUsers from "./PollsOptionsUsers.entity";
import Users from "./Users.entity";

/**
    Table of polls
   */
@Entity()
export default class Polls extends ExtendedBaseEntity<Polls> {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id!: number

    @Column({
        type: 'text'
    })
    text!: string

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    category?: string

    @Column("json", { nullable: true })
    ops?: QuillOps[]

    @Column({
        type: 'int',
        default: 0
    })
    answers!: number

    @Column({
        type: 'timestamp',
        nullable: true
    })
    expiresAt?: Date

    @Column("int", { width: 11, unsigned: true })
    createdByUserId!: number

    @ManyToOne(() => Users, (user) => user.polls, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "createdByUserId", referencedColumnName: "id" })
    createdByUser!: Users

    @OneToMany(() => PollsOptions, (pollsOptions) => pollsOptions.poll)
    pollsOptions?: PollsOptions[]

    @OneToMany(() => PollsOptionsUsers, (pollsOptionsUsers) => pollsOptionsUsers.poll)
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