// import { Test } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { User } from './interface/user.interface';
// import { RegisterUserDto } from './dto/user.dto';
// import * as bcrypt from 'bcrypt';
// import { getModelToken, MongooseModule } from '@nestjs/mongoose';
// import { InvariantError } from '../common/exceptions/invariant.error';
// import { MONGO_CONFIG } from '../config';
// import { plainToInstance } from 'class-transformer';
// import { Connection, Model } from "mongoose";
// import { UserSchema } from "./schema/user.schema";
//
// describe('UserService', () => {
//   let service: UserService;
//   let usersModel;
//
//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       // imports: [MongooseModule.forRoot(MONGO_CONFIG.uri)],
//       providers: [
//         UserService,
//         {
//           provide: new Model('User', UserSchema),
//           useFactory: () => {
//             findOne: jest.fn()
//           }
//         },
//       ],
//     }).compile();
//
//     service = module.get<UserService>(UserService);
//     usersModel = module.get<Model<User>>(new Model('User', UserSchema))
//   });
//
//   afterEach(() => {
//     service = undefined;
//   });
//
//   it('should create a new user', async () => {
//     const userDto: RegisterUserDto = plainToInstance(RegisterUserDto, {
//       username: 'johndoe',
//       email: 'johndoe@example.com',
//       password: 'supersecret',
//     });
//     expect(usersModel.findOne).toBeCalled()
//
//     // const user = await service.createUser(userDto);
//     //
//     // expect(user).toHaveProperty('username', 'test-username');
//     // expect(user).toHaveProperty('email', 'test@example.com');
//     // expect(user).toHaveProperty('password', undefined);
//   });
//   //
//   // it('should throw an error if the username already exists', async () => {
//   //   const userDto = new RegisterUserDto({
//   //     username: 'test-username',
//   //     email: 'test@example.com',
//   //     password: 'password',
//   //   });
//   //
//   //   await service.createUser(userDto);
//   //
//   //   try {
//   //     await service.createUser(userDto);
//   //   } catch (error) {
//   //     expect(error).toBeInstanceOf(InvariantError);
//   //     expect(error.message).toBe('username already exists');
//   //   }
//   // });
//   //
//   // it('should throw an error if the email already exists', async () => {
//   //   const userDto = new RegisterUserDto({
//   //     username: 'test-username',
//   //     email: 'test@example.com',
//   //     password: 'password',
//   //   });
//   //
//   //   await service.createUser(userDto);
//   //
//   //   try {
//   //     await service.createUser({
//   //       username: 'different-username',
//   //       email: 'test@example.com',
//   //       password: 'password',
//   //     });
//   //   } catch (error) {
//   //     expect(error).toBeInstanceOf(InvariantError);
//   //     expect(error.message).toBe('email already exists');
//   //   }
//   // });
// });
