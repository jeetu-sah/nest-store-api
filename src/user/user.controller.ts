import { Controller, Get, Post, Req, Res, HttpStatus, Delete, Param, Put, Patch } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
      res.status(HttpStatus.OK).json({ data: null, msg: 'User Does not exists' });

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
  async updateUser(@Param('id') id: number, @Req() request: Request, @Res() res: Response) {
    // return 'test';
    const user = await this.userService.details(id);
    if (user) {
      user['firstName'] = request.body.first_name;
      user['lastName'] = request.body.lastName;
      user['isActive'] = request.body.status;
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
    const password = request.body.password;
    //request.body -> for all form data
    //request.body.first_name -> for single key data
    const userEmail = await this.userService.findUserByFieldName({ 'email': email });
    const userMobile = await this.userService.findUserByFieldName({ 'mobile': mobile });
    const userPassword = await this.userService.findUserByFieldName({ 'password': password });

    if (userEmail && userMobile && userPassword) {
      res.status(HttpStatus.OK).json({ 'msg': 'This email , mobile number and Password is already already exists..' });
    } else if (userEmail && userPassword) {
      res.status(HttpStatus.OK).json({ "msg": 'this email and password is already exist please enter new email..' })
    }
    else if (userMobile && userPassword) {
      res.status(HttpStatus.OK).json({ "msg": 'this number and password is already exist please enter new number..' })
    }
    else if (userMobile && userEmail) {
      res.status(HttpStatus.OK).json({ "msg": 'this number and email is already exist please enter new number..' })
    } else if (userPassword) {
      res.status(HttpStatus.OK).json({ "msg": 'this password is already exist please enter new password..' })
    }
    else if (userEmail) {
      res.status(HttpStatus.OK).json({ "msg": 'this mail is already exist please enter new mail..' })
    }
    else if (userMobile) {
      res.status(HttpStatus.OK).json({ "msg": 'this number is already exist please enter new number..' })
    }

    const userResult = await this.userService.create(request.body);
    res.status(HttpStatus.OK).json(userResult);
  }

  @Post('/login')
  async login(@Req() request: Request, @Res() res: Response) {

    const loginemail = request.body.email;
    const loginpassword = request.body.password;
    const userExists = await this.userService.findUserByFieldName({ 'email': loginemail });
    if (userExists) {
      if (userExists.password === loginpassword) {
        res.status(HttpStatus.OK).json({ 'msg': 'Login  successfully', 'data': userExists });
      } else {
        res.status(HttpStatus.OK).json({ 'msg': 'user password ddoes not matched!!!' });
      }
    }
    else {
      res.status(HttpStatus.OK).json({ 'msg': 'user does not exist' });
    }
  }

}
