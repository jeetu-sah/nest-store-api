import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { UserotpService } from './userotp.service';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service'

@Controller('userotp')
export class UserotpController {
  constructor(private readonly UserotpService: UserotpService, private readonly UserService: UserService) { }

  @Get("")
  find() {
    return 'All OTPs are....'
  }
  @Post('/create')
  async create(@Req() request: Request, @Res() res: Response) {
    const loginid = request.body.user_id;
    let userExists;
    if (loginid.includes("@")) {
      userExists = await this.UserService.findUserByFieldName({ 'email': loginid });
    } else {
      userExists = await this.UserService.findUserByFieldName({ 'mobile': loginid });
    }

    if (userExists) {
      //deactivee all previous OTP

      //create new OTP
      let minm = 100000;
      let maxm = 999999;
      let randomOtp = Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;

      const userOtpRequest = {
        user_id: userExists.id,
        isActive: true,
        otp: randomOtp,
      }

      const userResult = await this.UserotpService.create(userOtpRequest);

      res.status(HttpStatus.OK).json({ msg: 'Otp has been generated and sent your registered email / mobile !!!', data: userResult });

    } else {
      res.status(HttpStatus.OK).json({ 'msg': 'User does not exists !!!' });
    }

  }
}
