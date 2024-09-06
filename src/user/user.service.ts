import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    find(): string {
        return 'Return user details';
    }

    findAll(): string {
        return 'return all users details  !';
    }
}
