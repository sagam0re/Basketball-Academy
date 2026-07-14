import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/database/interfaces/role.interface';

export const Roles = Reflector.createDecorator<UserRoles[]>();
