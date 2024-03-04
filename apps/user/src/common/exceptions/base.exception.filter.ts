// 处理统一异常

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ServiceUnavailableException } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
  catch(exception: Error, host:ArgumentsHost){
    const ctx = host.switchToHttp()
    const response =ctx.getResponse()
    const request = ctx.getRequest()

    // 非HTTP标准异常的处理
    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse()
    })
  }
}