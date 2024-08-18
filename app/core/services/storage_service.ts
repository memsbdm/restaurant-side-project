import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'

type StoragePath = 'ownership'

@inject()
export class StorageService {
  async store(file: MultipartFile, path: StoragePath): Promise<{ key: string; url: string }> {
    const key = `uploads/${path}/${cuid()}.${file.extname}`
    await file.moveToDisk(key)
    const url = await drive.use('s3').getUrl(key)
    return { key, url }
  }

  async destroy(key: string): Promise<void> {
    return drive.use('s3').delete(key)
  }
}
