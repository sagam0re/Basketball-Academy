import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let problemDetails: Record<string, any> = {
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: 500,
      message: 'Internal server error',
    };

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse() as any;

      if (Array.isArray(exceptionResponse.message)) {
        problemDetails = {
          ...problemDetails,
          statusCode: exception.getStatus(),
          message: `${exceptionResponse.message.length} validation failed.`,
          errors: exceptionResponse.message,
        };
      } else {
        problemDetails = {
          ...problemDetails,
          statusCode: exception.getStatus(),
          message: exceptionResponse.message || exceptionResponse,
        };
      }
    } else if (exception instanceof HttpException) {
      problemDetails = {
        ...problemDetails,
        statusCode: exception.getStatus(),
        message: exception.message,
        error: exception.name,
        stack: exception.stack,
      };
    } else {
      console.error('Unhandled Exception:', exception);
    }

    response.status(problemDetails.statusCode).json(problemDetails);
  }
}
