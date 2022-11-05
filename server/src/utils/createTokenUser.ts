import { IUser } from '../models/User'

function createTokenUser(user: IUser) {
  const tokenUser = {
    userID: user._id,
    email: user.email,
    name: user.username,
  }

  return tokenUser
}

export default createTokenUser
