import { Column, CreateDateColumn, Entity, Generated, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserPermission } from "../services/enum/user.enum";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import Polls from "./Polls.entity";
import PollsOptionsUsers from "./PollsOptionsUsers.entity";

@Entity()
export default class Users extends ExtendedBaseEntity<Users> {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id!: number

    @Column('uuid')
    @Generated("uuid")
    @Index({ unique: true })
    uuid!: string

    @Column("varchar", { length: 255, nullable: false })
    @Index({ fulltext: true })
    name!: string

    @Column("varchar", { length: 64, nullable: true, select: false })
    password!: string;

    @Column("varchar", { length: 255, nullable: false })
    @Index('IDX_U_EMAIL', { unique: true })
    email!: string

    @Column("varchar", { length: 14, nullable: false })
    @Index('IDX_U_DOCUMENT', { unique: true })
    document!: string

    @Column("varchar", { length: 10, nullable: false })
    permission!: UserPermission

    @OneToMany(() => Polls, (poll) => poll.createdByUser)
    polls?: Polls[]

    @OneToMany(() => PollsOptionsUsers, (pollsOptionsUsers) => pollsOptionsUsers.user)
    pollsOptionsUsers?: PollsOptionsUsers[]

    @CreateDateColumn({
        type: "datetime",
        name: "created_at"
    })
    readonly createdAt?: Date;

    @UpdateDateColumn({
        type: "datetime",
        name: "updated_at"
    })
    readonly updatedAt?: Date;
}