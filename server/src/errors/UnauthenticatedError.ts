import CustomApiError from './CustomApiError'
import statusCodes from './statusCodes'

class UnauthenticatedError extends CustomApiError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = statusCodes.FORBIDDEN
  }
}

export default UnauthenticatedError
