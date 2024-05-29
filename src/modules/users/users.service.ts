import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Quyen, QuyenDocument } from '../quyen/schemas/quyen.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Quyen.name) private quyenModel: Model<QuyenDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRole = await this.quyenModel.findOne({ role: 'user' });
    const user = new this.userModel({
      username,
      password: hashedPassword,
      role: defaultRole._id,
    });
    const result = await user.save();
    const userObj = result.toObject();
    delete userObj.password;
    return userObj;
  }

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username }).populate('role').lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('role').exec();
  }

  async findByRoleId(roleId: string): Promise<User[]> {
    return this.userModel.find({ role: roleId }).populate('role').exec();
  }
}
