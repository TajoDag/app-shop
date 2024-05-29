import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Quyen } from '../../quyen/schemas/quyen.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quyen', default: 'ObjectId của role user mặc định' })
  role: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
