import { Controller, Get, Post, Req, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async deleteUser (@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.userService.details(id);
    if(detailsResponse) {
        const deleteResponse = await this.userService.delete(id);
        res.status(HttpStatus.OK).json(deleteResponse);
      } else{
        res.status(HttpStatus.OK).json({data: null, msg: 'User Does not exists'});

      }
  }


  @Get('/:id') 
  async details (@Param('id') id: number, @Res() res: Response) {
      const detailsResponse = await this.userService.details(id);
      if(detailsResponse) {
        res.status(HttpStatus.OK).json(detailsResponse);
      } else{
        res.status(HttpStatus.OK).json({data: null, msg: 'no record found'});

      }
  }

}
