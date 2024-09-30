import { Controller, Get, Post, Req, Res, HttpStatus, Delete, Param, Patch, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin-dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('/')
  find() {
    return this.adminService.find();
  }
  @Post('/create')
  async create(@Body() body: CreateAdminDto,@Req() request: Request, @Res() res: Response) { 

    const adminResult = await this.adminService.create(request.body); 
    res.status(HttpStatus.OK).json({msg:"one new admin created",data:adminResult});
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.adminService.details(id);
    if (detailsResponse) {
      const deleteResponse = await this.adminService.delete(id);
      res.status(HttpStatus.OK).json({ data: deleteResponse, msg: 'one admin deleted' });
    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'User Does not exists' });

    }
  }
  @Get('/:id')
  async details(@Param('id') id: number, @Res() res: Response) {
    const detailsResponse = await this.adminService.details(id);
    if (detailsResponse) {
      res.status(HttpStatus.OK).json( { msg: 'Details are :',data: detailsResponse } );
    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });

    }
  }
  @Patch('/:id')
  async updateAdmin(@Param('id') id: number, @Req() request: Request, @Res() res: Response) {
    // return 'test';
    const admin = await this.adminService.details(id);
    if (admin) {
      admin['firstName'] = request.body.firstName;
      admin['lastName'] = request.body.lastName;
      admin['isActive'] = request.body.isActive;
      const updatedata = await this.adminService.update(admin);
      res.status(HttpStatus.OK).json( { msg: 'Updated data are :',data: updatedata } );
    } else {
      res.status(HttpStatus.OK).json({ data: null, msg: 'admin  not exits' });
    }
  }

}
