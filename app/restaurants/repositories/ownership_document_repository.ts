import OwnershipDocument from '#restaurants/models/ownership_document'
import { type StoreRestaurantDocumentDto } from '#restaurants/dtos/store_restaurant_document_dto'

export class OwnershipDocumentRepository {
  store(document: StoreRestaurantDocumentDto): Promise<OwnershipDocument> {
    return OwnershipDocument.create(document)
  }
}
