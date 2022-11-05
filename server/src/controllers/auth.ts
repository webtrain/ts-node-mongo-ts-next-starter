import { Request, Response } from 'express'
import User from '../models/User'
import statusCodes from '../errors/statusCodes'
import CustomError from '../errors'
import { createTokenUser, attachCookiesToResponse } from '../utils'
import Token from '../models/Token'

interface CustomRequest extends Request {
  user: {
    userID: number
    email: string
    name: string
  }
}

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new CustomError.BadRequestError('Please provide username, email and password!')
  }

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists!')
  }

  const user = await User.create({ username, email, password })
  const tokenUser = createTokenUser(user)
  res.status(statusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password!')
  }

  const user = await User.findOne({ email }).exec()
  if (!user) throw new CustomError.UnauthenticatedError('Invalid Credentials')

  const isValidPassword = await user.comparePassword(password)
  if (!isValidPassword) throw new CustomError.UnauthenticatedError('Invalid Credentials')

  const tokenUser = createTokenUser(user)

  attachCookiesToResponse(res, tokenUser)

  res.status(statusCodes.OK).json({ user: tokenUser })
}

const logout = async (req: CustomRequest, res: Response) => {
  await Token.findOneAndDelete({ user: req.user.userID })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(statusCodes.OK).json({ msg: 'User logged out!' })
}

export { login, register, logout }
