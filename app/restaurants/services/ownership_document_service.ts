import { inject } from '@adonisjs/core'
import { OwnershipDocumentRepository } from '#restaurants/repositories/ownership_document_repository'
import { type RestaurantId } from '#restaurants/models/restaurant'
import type OwnershipDocument from '#restaurants/models/ownership_document'

@inject()
export class OwnershipDocumentService {
  constructor(private repository: OwnershipDocumentRepository) {}

  store(restaurantId: RestaurantId, url: string): Promise<OwnershipDocument> {
    return this.repository.store({ restaurantId, url })
  }
}
