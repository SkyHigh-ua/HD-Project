import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';

@Entity('User')
class UserEntity {
    @PrimaryGeneratedColumn()
        id = 0;

    @Column({type: 'text', unique: true})
        username = '';

    @Column('text')
        firstName = '';

    @Column('text')
        lastName = '';

    @Column({type: 'text', unique: true})
        email = '';

    @Column('text')
        password = '';

    @Column({type: 'text', nullable: true})
        token?: string;
}

export default UserEntity;
