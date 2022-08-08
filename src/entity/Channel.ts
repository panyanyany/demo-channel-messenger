import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
