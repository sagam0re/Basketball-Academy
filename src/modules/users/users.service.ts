import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return existingUser;
    }

    async update(id: number, updateUserData: UpdateUserDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        return await this.prisma.user.update({ where: { id }, data: updateUserData });
    }

    async remove(id: number) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return await this.prisma.user.delete({ where: { id } });
    }
}
