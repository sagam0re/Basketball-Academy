import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {
        // 1. Check if user already exists
        const existingUser = await this.prisma.user.findFirst({
            where: { email: dto.email }
        });

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        console.log(' hashedPassword', hashedPassword);
        console.log(typeof hashedPassword);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                lastName: dto.lastName,
                role: dto.role
            }
        });

        // 4. Return sanitized user data (exclude password)
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
