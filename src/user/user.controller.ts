import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Delete,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserotpService } from '../userotp/userotp.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly UserotpService: UserotpService) { }

  @Get('/')
  find() {
    return this.userService.find();
  }

  @Post('/create')
  async create(@Req() request: Request, @Res() res: Response) {
    //request.body -> for all form data
    //request.body.first_name -> for single key data
    const userResult = await this.userService.create(request.body);

    res.status(HttpStatus.OK).json(userResult);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.userService.details(id);
    if (detailsResponse) {
      const deleteResponse = await this.userService.delete(id);
      res.status(HttpStatus.OK).json(deleteResponse);
    } else {
      res
        .status(HttpStatus.OK)
        .json({ data: null, msg: 'User Does not exists' });
    }
  }

  @Get('/:id')
  async details(@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.userService.details(id);
    if (detailsResponse) {
      res.status(HttpStatus.OK).json(detailsResponse);
    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    // return 'test';
    const user = await this.userService.details(id);
    if (user) {
      user['firstName'] = request.body.first_name;
      user['lastName'] = request.body.lastName;
      user['isActive'] = request.body.status;
      user['email'] = request.body.email;
      user['mobile'] = request.body.mobile;
      const updatedata = await this.userService.update(user);
      res.status(HttpStatus.OK).json(updatedata);
    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'User  not exits' });
    }
  }


  @Post('/registration')
  async registration(@Req() request: Request, @Res() res: Response) {
    const email = request.body.email;
    const mobile = request.body.mobile;
    //request.body -> for all form data
    //request.body.first_name -> for single key data
    const user = await this.userService.checkUserMobileEmail(email, mobile);
    if (user.length == 0) {
      const userResult = await this.userService.create(request.body);
      return res
        .status(HttpStatus.OK)
        .json({ msg: 'User created successfully', data: userResult });
    } else {
      return res.status(HttpStatus.OK).json({
        msg: 'This mobile and email is already exists',
        data: null,
      });
    }
  }


  @Post('/login')
  async login(@Req() request: Request, @Res() res: Response) {

    const loginWithOtp = request.body.loginWithOtp;
    const otp = request.body.OTP;
    const loginID = request.body.loginid;
    const loginpassword = request.body.password;

    let userExists;
    if (loginID.includes("@")) {
      userExists = await this.userService.findUserByFieldName({ 'email': loginID });
    } else {
      userExists = await this.userService.findUserByFieldName({ 'mobile': loginID });
    }

    if (userExists) {

      if (loginWithOtp === true) {
        const userOtp = await this.UserotpService.findUserOtp(userExists.id);


        if (userOtp[0].otp === otp && userOtp[0].isActive === true) {
          res.status(HttpStatus.OK).json({ 'msg': 'Login  successfully', 'data': userOtp });
        } else {
          res.status(HttpStatus.OK).json({ 'msg': 'OTP does not matched!!!', data: null });
        }


      } else {
        if (userExists.password === loginpassword) {
          res.status(HttpStatus.OK).json({ 'msg': 'Login  successfully', 'data': userExists });
        } else {
          res.status(HttpStatus.OK).json({ 'msg': 'user password ddoes not matched!!!', data: null });
        }
      }
    }
    else {
      res.status(HttpStatus.OK).json({ 'msg': 'user does not exist', data: null });
    }

  }

  @Post('/forgetPassword')
  async forgetPassword(@Req() request: Request, @Res() res: Response) {
    const forgetPasswordEmail = request.body.email;
    const userExistPassword = await this.userService.findUserByFieldName({ 'email': forgetPasswordEmail });
    if (userExistPassword) {

      userExistPassword['password'] = request.body.password;
      const updatedPassword = await this.userService.updatePassword(userExistPassword);
      res.status(HttpStatus.OK).json({ 'msg': 'password Updated  successfully', 'data': updatedPassword });

    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'User  not exits, please enter Valid Email' });
    }

  }
}
