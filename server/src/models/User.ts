import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  _id: number
  username: string
  email: string
  password: string
  role: 'admin' | 'user'
}

interface UserMethods {
  comparePassword(string: string): Promise<boolean>
}

type UserModel = Model<IUser, Record<string, never>, UserMethods>

const UserSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username!'],
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v,
          )
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
      unique: true,
      required: [true, 'Please provide a valid email!'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a username'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
      default: 'user',
    },
  },
  { timestamps: true },
)

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (passwordToCompare: string) {
  const isMatch = await bcrypt.compare(passwordToCompare, this.password)
  return isMatch
}

const User = model<IUser, UserModel>('User', UserSchema)

export default User
