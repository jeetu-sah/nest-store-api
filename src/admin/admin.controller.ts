import { Controller, Get, Post, Req, Res, HttpStatus, Delete, Param, Patch } from '@nestjs/common';
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
  @Patch('/:id')
  async updateAdmin (@Param('id') id:number, @Req() request: Request, @Res() res: Response) {
    // return 'test';
    const admin = await this.adminService.details(id);  
    if(admin) {
      admin['firstName'] = request.body.firstName;
      admin['lastName'] = request.body.lastName;
      admin['isActive'] = request.body.isActive; 
      const updatedata = await this.adminService.update(admin);
      res.status(HttpStatus.OK).json(updatedata);
    }else{
      res.status(HttpStatus.OK).json({data: null, msg: 'admin  not exits'});
    }
  }

}
