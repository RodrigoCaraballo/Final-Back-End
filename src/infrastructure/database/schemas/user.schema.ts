import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from '../../../domain';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true, collection: 'Users' })
export class User {
  @Prop({ type: String, required: true, unique: true })
  uid: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: RolesEnum})
  role: RolesEnum;

  @Prop({ type: Boolean, default: false })
  activate: boolean;

  @Prop({ type: String, required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
