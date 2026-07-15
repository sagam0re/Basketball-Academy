import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Public } from './public.decorator';
import { UserRoles } from 'src/database/interfaces/role.interface';
import { Request } from 'express';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic =
            this.reflector.get(Public, context.getHandler()) ||
            this.reflector.get(Public, context.getClass());
        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context
            .switchToHttp()
            .getRequest<Request & { user?: { roles: UserRoles[] } }>();
        const user = request.user;
        if (!user || !user.roles) {
            console.log(123)
            return false;
        }
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
