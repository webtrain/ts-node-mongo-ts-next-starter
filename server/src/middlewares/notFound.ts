import { Request, Response } from 'express'
import statusCodes from '../errors/statusCodes'

const notFound = (req: Request, res: Response) =>
  res.status(statusCodes.NOT_FOUND).send('Route does not exists.')

export default notFound
