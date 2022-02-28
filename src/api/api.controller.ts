import { Controller, Get, HostParam } from '@nestjs/common';

// 하위 도메인 처리
// @Controller({ host: 'api.localhost' })
@Controller({ host: ':version.api.localhost' })
export class ApiController {
  @Get()
  index(@HostParam('version') version: string): string {
    return `Hello, API ${version}`;
  }
}

/*
@Controller({ host: 'api.localhost' })
export class ApiController {
  @Get()
  index(): string {
    return 'Hello, API';
  }
}
*/
