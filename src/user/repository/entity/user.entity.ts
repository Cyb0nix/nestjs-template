import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../../shared/api-enums';


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({enum: UserRole, default: UserRole.user})
    role: UserRole;
}