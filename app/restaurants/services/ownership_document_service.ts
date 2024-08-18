import { inject } from '@adonisjs/core'
import { OwnershipDocumentRepository } from '#restaurants/repositories/ownership_document_repository'
import { type RestaurantId } from '#restaurants/models/restaurant'
import type OwnershipDocument from '#restaurants/models/ownership_document'

@inject()
export class OwnershipDocumentService {
  constructor(private repository: OwnershipDocumentRepository) {}

  store(restaurantId: RestaurantId, key: string, url: string): Promise<OwnershipDocument> {
    return this.repository.store({ restaurantId, key, url })
  }

  confirm(restaurantId: RestaurantId): Promise<void> {
    return this.repository.confirm(restaurantId)
  }

  destroy(restaurantId: RestaurantId): Promise<void> {
    return this.repository.destroy(restaurantId)
  }
}
