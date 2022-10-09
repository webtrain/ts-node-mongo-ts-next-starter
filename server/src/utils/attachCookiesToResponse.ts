import { Response } from 'express'
import { JWT } from './index'
import { IUser } from './jwt'

function attachCookiesToResponse(res: Response, user: IUser) {
  const accessTokenJWT = JWT.create(user)
  const refreshTokenJWT = JWT.create(user)

  const oneDay = 1000 * 60 * 60 * 24
  const twentyMinutes = 1000 * 60 * 20

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + twentyMinutes),
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
}

export default attachCookiesToResponse
