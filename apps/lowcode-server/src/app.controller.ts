import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { BusinessException } from './common/exceptions/business.exception';

@Controller({
  path: 'user',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll(){
    return 'i am old one'
  }

  @Get()
  @Version('2')
  findAdd2(){
    return `i am new one ${process.env.DATABASE_USER}`
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError(){
    const a:any = {}
    console.log(a.b.c)
    return this.appService.getHello()
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError(){
    const a: any ={}
    try{
      console.log(a.b.c)
    }catch(error){
      throw new BusinessException('你这个参数错了')
    }
    return this.appService.getHello()
  }
}
