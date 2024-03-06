import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import Users from "./Users.entity";
import PollsOptions from "./PollsOptions.entity";
import Polls from "./Polls.entity";

/**
    Table of polls_options_users
   */
@Entity()
@Unique('pollOption', ['pollId', 'userId'])
export default class PollsOptionsUsers extends ExtendedBaseEntity<PollsOptionsUsers> {
    @PrimaryColumn({ type: 'int', unsigned: true })
    pollOptionId!: number

    @ManyToOne(() => PollsOptions, (pollsOptions) => pollsOptions.pollsOptionsUsers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "pollOptionId", referencedColumnName: "id" })
    pollOption!: PollsOptions

    @PrimaryColumn({ type: 'int', unsigned: true })
    userId!: number

    @ManyToOne(() => Users, (user) => user.pollsOptionsUsers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user!: Users

    @Column({ type: "int", unsigned: true })
    pollId!: number

    @ManyToOne(() => Polls, (poll) => poll.pollsOptionsUsers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "pollId", referencedColumnName: "id" })
    poll!: Polls

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