import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "server/modules/User/User.entity";
import { TaskColor } from "types/task";

@Entity("tasks")
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("text")
  @Field(() => String)
  title!: string;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  description?: string | null;

  @Column("simple-array")
  @Field(() => [String], { nullable: true })
  tags?: string[] | null;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  color?: TaskColor | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  startDate?: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  dueDate?: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  remindMeAt?: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  completedAt?: Date | null;

  @Column("int")
  @Field(() => Number)
  index: number;

  @Column({ type: "uuid", nullable: true })
  parentId?: string | null;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true })
  parent: Task;

  @OneToMany(() => Task, (task) => task.parent, { onDelete: "CASCADE" })
  subtasks: Task[];

  @Column("int")
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
