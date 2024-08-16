import { inject } from '@adonisjs/core'
import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import { RestaurantRepository } from '#restaurants/repositories/restaurant_repository'
import type Restaurant from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'
import { StorageService } from '#core/services/storage_service'
import { type MultipartFile } from '@adonisjs/core/bodyparser'
import { OwnershipDocumentService } from '#restaurants/services/ownership_document_service'
import type { ListRestaurantsQs } from '#restaurants/controllers/list_restaurants_controller'

@inject()
export class RestaurantService {
  constructor(
    private repository: RestaurantRepository,
    private storageService: StorageService,
    private ownershipDocumentService: OwnershipDocumentService
  ) {}

  async store(restaurant: StoreRestaurantDto, document: MultipartFile): Promise<Restaurant> {
    const storedRestaurant = await this.repository.store(restaurant)
    const url = await this.storageService.store(document, 'ownership')
    await this.ownershipDocumentService.store(storedRestaurant.id, url)

    return storedRestaurant
  }

  getAllPaginated(page: number, perPage: number, qs: ListRestaurantsQs) {
    return this.repository.getAllPaginated(page, perPage, qs)
  }

  getRestaurantsByUserId(id: UserId): Promise<Restaurant[]> {
    return this.repository.getRestaurantsByUserId(id)
  }
}
