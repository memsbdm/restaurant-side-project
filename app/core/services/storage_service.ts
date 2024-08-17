import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'

type StoragePath = 'ownership'

@inject()
export class StorageService {
  async store(file: MultipartFile, path: StoragePath): Promise<string> {
    const key = `uploads/${path}/${cuid()}.${file.extname}`
    await file.moveToDisk(key)

    return drive.use().getUrl(key)
  }
}
