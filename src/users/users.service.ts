import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async updateProfile(dto: CreateUserDto, token: string) {
    const decodedToken = this.jwtService.decode(token.split(' ')[1]);
    const userId = decodedToken['id'];
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    user.fullName = dto.fullName;
    user.profileImageUrl = dto.profileImageUrl;
    user.dateOfBirth = dto.dateOfBirth;

    await user.save();
    return user;
  }

  async getUserById(userId) {
    const user = await this.userRepository.findByPk(userId);
    return user;
  }

  async getCurrentUser(headers: Headers) {
    const token = headers['authorization'].split(' ')[1];
    const user = this.jwtService.decode(token);
    return this.userRepository.findOne({
      where: { id: user['id'] },
      attributes: ['id', 'email', 'banned', 'banReason'],
    });
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      `User or role doesn't exists`,
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.reason;
    await user.save();
    return user;
  }
}
