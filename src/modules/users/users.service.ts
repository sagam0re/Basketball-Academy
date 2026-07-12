import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';

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

        if (updateUserData.email) {
            console.log(updateUserData.email);
            const existingUserByEmail = await this.prisma.user.findUnique({ where: { email: updateUserData.email } });
            if (existingUserByEmail) {
                throw new BadRequestException('User with this email already exists');
            }
        }

        if (updateUserData.password) {
            const salt = await bcrypt.genSalt();
            updateUserData.password = await bcrypt.hash(updateUserData.password, salt);
        }

        const updatedUser = await this.prisma.user.update({ where: { id }, data: updateUserData });
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    async remove(id: number) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return await this.prisma.user.delete({ where: { id } });
    }
}
