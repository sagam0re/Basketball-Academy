import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, updateUserData: UpdateUserDto) {
        return await this.prisma.user.update({ where: { id }, data: updateUserData });
    }

    async remove(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}
