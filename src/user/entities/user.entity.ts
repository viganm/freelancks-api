import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: NamedCurve;

    @Column({ unique: true })
    email:string;
    
    @Column()
    name: string;
}
