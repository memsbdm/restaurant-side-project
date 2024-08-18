import OwnershipDocument from '#restaurants/models/ownership_document'
import { type StoreRestaurantDocumentDto } from '#restaurants/dtos/store_restaurant_document_dto'
import { StorageService } from '#core/services/storage_service'
import { inject } from '@adonisjs/core'
import { RestaurantId } from '#restaurants/models/restaurant'

@inject()
export class OwnershipDocumentRepository {
  constructor(private storageService: StorageService) {}
  store(document: StoreRestaurantDocumentDto): Promise<OwnershipDocument> {
    return OwnershipDocument.create(document)
  }

  async confirm(restaurantId: RestaurantId): Promise<void> {
    const document = await OwnershipDocument.findBy('restaurant_id', restaurantId)
    document!.isConfirmed = true
    await document!.save()
  }

  async destroy(restaurantId: RestaurantId): Promise<void> {
    const document = await OwnershipDocument.findBy('restaurant_id', restaurantId)
    await this.storageService.destroy(document!.key)
    await document!.delete()
  }
}
