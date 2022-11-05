import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import { getCurrentDate } from '../utils'

async function logEvents(message: string, logFileName: string) {
  const date = getCurrentDate()
  const uuid = crypto.randomUUID()
  const logItem = `${date}\t${uuid}\t${message}\n`

  const logsFolder = path.join(__dirname, '..', 'logs')

  try {
    if (!fs.existsSync(logsFolder)) {
      await fsPromises.mkdir(logsFolder)
    }

    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (error) {
    console.log(error)
  }
}

function logger(req: Request, res: Response, next: NextFunction) {
  const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`

  logEvents(logMessage, 'reqLog.log')
  console.log(logMessage)
  next()
}

export { logEvents, logger }
