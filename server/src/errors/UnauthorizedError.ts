import CustomApiError from './CustomApiError'
import statusCodes from './statusCodes'

class UnauthorizedError extends CustomApiError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = statusCodes.UNAUTHORIZED
  }
}

export default UnauthorizedError
