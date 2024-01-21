// mongoose-exception.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {MongooseError} from 'mongoose'

const errorsStatus = {
    'ValidationError': 400,
    'ValidatorError': 400,
    'CastError': 400,
    'DocumentNotFoundError': 404,
    'MongooseServerSelectionError': 500,
    'MongooseError': 500,

}

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const status = errorsStatus[exception.name] || 500;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}