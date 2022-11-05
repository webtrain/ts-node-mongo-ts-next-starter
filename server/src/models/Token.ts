import { Model, Schema, model, Types } from 'mongoose'

interface IToken {
  _id: number
  user: Types.ObjectId
  token: string
  ip: string
  userAgent: string
  isValid: boolean
  createdAt: Date
}

type TokenModel = Model<IToken, Record<string, never>>

const TokenSchema = new Schema<IToken, TokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Invalid Token'],
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400,
  },
})

const Token = model<IToken, TokenModel>('Token', TokenSchema)

export default Token
