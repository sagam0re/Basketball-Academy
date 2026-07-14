import { Injectable, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UserRoles } from 'src/database/interfaces/role.interface';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context) {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.roles);
    }

    matchRoles(roles: UserRoles[], userRoles: UserRoles[]): boolean {
        for (const role of userRoles) {
            if (roles.includes(role)) {
                return true;
            }
        }
        return false;
    }
}

