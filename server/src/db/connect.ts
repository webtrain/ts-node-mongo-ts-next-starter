import mongoose from 'mongoose'

const connectToDB = () => mongoose.connect(process.env.MONGO_URL as string)

export default connectToDB
