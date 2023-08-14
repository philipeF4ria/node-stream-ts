import { Router, Request, Response } from 'express'
import multer from 'multer'

const routes = Router();

const multerConfig = multer()

routes.post(
  '/upload',
  multerConfig.single('file'),
  async (request: Request, response: Response) => {

    const buffer = request.file?.buffer

    if (!buffer) {
      return response.json({
        error: 'File is missing'
      })
    }

    const buffers: number[] = []

    for await (const chunk of buffer) {
      buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers);

    return response.end();
  }
);

export { routes }
