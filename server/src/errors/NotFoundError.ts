import CustomApiError from './CustomApiError'
import statusCodes from './statusCodes'

class NotFoundError extends CustomApiError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = statusCodes.NOT_FOUND
  }
}

export default NotFoundError
