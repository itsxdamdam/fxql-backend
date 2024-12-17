import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FxqlParseResult, FxqlRequest } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("fxql-statements")
  @ApiOperation({ summary: 'Parse and store FXQL statements' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully parsed FXQL statements',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid FXQL syntax ',
  })
  async parseFXQL(@Body() request: FxqlRequest): Promise<FxqlParseResult> {
    try {
      const parseData = await this.appService.parseAndStore(request.FXQL);
      return {
        message: 'FXQL Statement Parsed Successfully',
        code: 'FXQL-200',
        data: parseData,
      };
    } catch {
      console.log('Error');
    }
  }
}
