import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiResponse({ status: 201, description: 'Dang nhap thanh cong' })
    @ApiResponse({ status: 401, description: 'dang nhap that bai' })
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return this.authService.login(loginUserDto);
    }

    @Post('refresh_token')
    refresh_token(@Body() { refresh_token }): Promise<any> {
        return this.authService.refreshToken(refresh_token);
    }

    @Post('logout')
    @ApiResponse({ status: 200, description: 'Logout successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    logout(@Body() { refresh_token }): Promise<any> {
        return this.authService.logout(refresh_token);
    }





}
