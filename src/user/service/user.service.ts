import {Injectable, Logger} from "@nestjs/common";
import { UserEntity } from '../repository/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../controller/dto/user-dto';

class UserNotFoundException implements Error {
  constructor(id: string) {
    this.message = `User with id ${id} not found`;
    this.name = 'UserNotFoundException';

  }

  message: string;
  name: string;
}

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async findOne(id: string): Promise<UserDto> {
    const entity= await this.userRepository.findOne({where:{id}, select: ['id', 'email', 'role']});
    if (!entity) {
      this.logger.error(`User with id: ${id} not found`);
      throw new UserNotFoundException(id);
    }
    return this.userEntityToDto(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOne({where: {email},select: ['id', 'email', 'password', 'role']});
    if (!entity) {
      this.logger.error(`User with email: ${email} not found`);
      throw new UserNotFoundException(email);
    }
    return entity;
  }

  async create(user: UserEntity) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.userRepository.save(user);
    this.logger.log(`Creating user with id: ${user.id}`);
    return user.id;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    if (!await this.userRepository.findOne({where: {id: user.id}})) {
      this.logger.error(`User with id ${user.id} not found`);
      throw new UserNotFoundException(user.id);
    }
    this.logger.log(`Updating user with id: ${user.id}`);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    if (!await this.userRepository.findOne({where: {id}})) {
      this.logger.error(`User with id: ${id} not found`);
      throw new UserNotFoundException(id);
    }
    this.logger.log(`Deleting user with id ${id}`);
    await this.userRepository.delete({id});
  }

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Finding all users');
    return this.userRepository.find({select: ['id', 'email', 'role']});
  }

  private userEntityToDto(user: UserEntity): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.role = user.role;
    return userDto;
  }
}