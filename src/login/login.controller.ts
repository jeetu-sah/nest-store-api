import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login-dto';
import { Request, Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService) { }


  @Get('/')
  find() {
    return this.loginService.find();
  }


  @Post('/create')
  async create(@Body() body: CreateLoginDto, @Req() request: Request, @Res() res: Response) {
    const userResult = await this.loginService.create(request.body);
    res.status(HttpStatus.OK).json({ msg: "user created..", data: userResult });
  }
}
