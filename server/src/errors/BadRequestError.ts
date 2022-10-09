import CustomApiError from './CustomApiError'
import statusCodes from './statusCodes'

class BadRequestError extends CustomApiError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = statusCodes.BAD_REQUEST
  }
}

export default BadRequestError
