import { Controller, Get, Post, Req, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  find() { 
    return this.adminService.find();
  }
  @Post('/create')
  async create(@Req() request: Request, @Res() res: Response) {
    //request.body -> for all form data
    //request.body.first_name -> for single key data
    const adminResult = await this.adminService.create(request.body);

    res.status(HttpStatus.OK).json(adminResult);
  }

  @Delete('/:id') 
  async deleteUser (@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.adminService.details(id);
    if(detailsResponse) {
        const deleteResponse = await this.adminService.delete(id);
        res.status(HttpStatus.OK).json(deleteResponse);
      } else{
        res.status(HttpStatus.OK).json({data: null, msg: 'User Does not exists'});

      }
  }
  @Get('/:id') 
  async details (@Param('id') id: number, @Res() res: Response) {
      const detailsResponse = await this.adminService.details(id);
      if(detailsResponse) {
        res.status(HttpStatus.OK).json(detailsResponse);
      } else{
        res.status(HttpStatus.OK).json({data: null, msg: 'no record found'});

      }
  }

}
