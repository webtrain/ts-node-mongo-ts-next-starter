import { Model, Schema, model, SchemaDefinitionProperty } from 'mongoose'

interface IToken {
  _id: number
  token: SchemaDefinitionProperty<string> | undefined
}

type TokenModel = Model<IToken, Record<string, never>>

const TokenSchema = new Schema<IToken, TokenModel>({
  token: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Token = model<IToken, TokenModel>('Token', TokenSchema)

export default Token
