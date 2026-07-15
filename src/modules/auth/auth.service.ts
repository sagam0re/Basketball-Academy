import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    //private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.usersService.findOneByEmail(dto.email);

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
      roles: user.role.map((r) => r.toLowerCase()),
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
