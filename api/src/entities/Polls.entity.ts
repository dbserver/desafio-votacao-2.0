import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import Users from "./Users.entity";
import PollsOptions from "./PollsOptions.entity";
import PollsOptionsUsers from "./PollsOptionsUsers.entity";

export interface QuillOps {
    insert: {
        mention: {
            id: number
            accountUserId?: number,
            value: string,
            index: number,
            denotationChar: string
        }
    } | string
}

@Entity()
export default class Polls extends ExtendedBaseEntity<Polls> {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id!: number

    @Column({
        type: 'text',
        nullable: true
    })
    text?: string

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
    createdByUser!: Users[]

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