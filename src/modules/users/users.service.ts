import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    const result = await user.save();
    const userObj = result.toObject();
    delete userObj.password;
    return userObj;
  }

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username }).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
