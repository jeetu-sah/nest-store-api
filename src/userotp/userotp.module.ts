import { Module } from '@nestjs/common';
import { UserotpService } from './userotp.service';
import { UserotpController } from './userotp.controller';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';

@Module({
   
    providers: [UserotpService,UserService],
    controllers: [UserotpController,UserController]
})
export class UserotpModule { }




