import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env

export interface IUser {
  userID: number
  name: string
  email: string
}

function create(user: IUser) {
  const token = jwt.sign({ user }, JWT_SECRET as string)
  return token
}

function validate(token: string) {
  const isValid = jwt.verify(token, JWT_SECRET as string)
  return isValid
}

export { create, validate }
