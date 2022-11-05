import { NextFunction, Request, Response } from 'express'
import statusCodes from '../errors/statusCodes'
import { logEvents } from './logger'

type CustomError = {
  statusCode: number
  msg: string
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const customError: CustomError = {
    statusCode: err.statusCode || statusCodes.BAD_REQUEST,
    msg: err.message || 'Something went wrong try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',')
    customError.statusCode = statusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`
    customError.statusCode = statusCodes.BAD_REQUEST
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = statusCodes.NOT_FOUND
  }

  // eslint-disable-next-line prettier/prettier
  logEvents(`${err.name}: ${customError.msg}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

  return res.status(customError.statusCode).json({ error: customError })
}

export default errorHandler
