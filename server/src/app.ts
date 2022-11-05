import express, { Request, Response } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import path from 'path'
import notFound from './middlewares/notFound'
import errorHandler from './middlewares/errorHandler'
import authRoute from './routes/authRoute'
import connectToDB from './db/connect'
import config from './config'
import CustomApiError from './errors/CustomApiError'
import cookieParser from 'cookie-parser'

// middleware imports
import cors from 'cors'
import fileUpload from 'express-fileupload'
import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'
import { logger } from './middlewares/logger'

dotenv.config()

const app = express()
const { PORT } = config

// middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
)
app.use(morgan('tiny'))
app.use(logger)

app.use(express.static(path.join(__dirname, '/public')))
app.use(fileUpload())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('<h3>Server is up and running</h3>')
})

app.use('/api/v1/auth', authRoute)

app.use(notFound)
app.use(errorHandler)

// Start server
async function start() {
  try {
    await connectToDB()
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  } catch (err) {
    throw new CustomApiError('Unable to connect to database.')
  }
}

start()
