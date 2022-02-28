import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  Redirect,
  Query, DefaultValuePipe, ParseIntPipe
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string) {
    return await this.usersService.getUserInfo(userId);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
  }

  /*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
  }
  */

  /*
  @Get()
  findAll(
    @Res() res,
    @Query() query: GetUserDto
  ) {
    console.log(query);
    const users = this.usersService.findAll();
    return res.status(200).send(users);
  }
  */

  /*
  @Redirect('https://nestjs.com', 301)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }

    return this.usersService.findOne(+id);
  }
  */

  // 라우트 파라미터 (1)
  /*
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(@Param() params: { [key: string]: string }) {
    return `userId: ${params.userId}, memoId: ${params.memoId}`;
  }
  */

  // 라우트 파라미터 (2)
  /*
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string,
  ) {
    return `userId: ${userId}, memoId: ${memoId}`;
  }
  */
}
