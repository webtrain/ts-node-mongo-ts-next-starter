import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from './config'

dotenv.config()

const app = express()
const port = config.port || 5500

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('<h3>Server is up and running</h3>')
})

app.listen(port, () => console.log(`Server is running on port: ${port}`))
