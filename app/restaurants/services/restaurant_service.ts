import { inject } from '@adonisjs/core'
import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import { RestaurantRepository } from '#restaurants/repositories/restaurant_repository'
import Restaurant, { type RestaurantId } from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'
import { StorageService } from '#core/services/storage_service'
import { type MultipartFile } from '@adonisjs/core/bodyparser'
import { OwnershipDocumentService } from '#restaurants/services/ownership_document_service'
import type { ListRestaurantsQs } from '#restaurants/controllers/list_restaurants_controller'
import type { RestaurantStatusId } from '#restaurants/enums/restaurant_status'
import type { UpdateRestaurantDto } from '#restaurants/dtos/update_restaurant_dto'

@inject()
export class RestaurantService {
  constructor(
    private repository: RestaurantRepository,
    private storageService: StorageService,
    private ownershipDocumentService: OwnershipDocumentService
  ) {}

  async store(restaurant: StoreRestaurantDto, document: MultipartFile): Promise<Restaurant> {
    const storedRestaurant = await this.repository.store(restaurant)
    const { key, url } = await this.storageService.store(document, 'ownership')
    await this.ownershipDocumentService.store(storedRestaurant.id, key, url)

    return storedRestaurant
  }

  paginate(page: number, perPage: number, qs: ListRestaurantsQs) {
    return this.repository.paginate(page, perPage, qs)
  }

  findRestaurantById(id: RestaurantId): Promise<Restaurant | null> {
    return this.repository.findRestaurantById(id)
  }

  findRestaurantWithOwnership(id: RestaurantId): Promise<Restaurant | null> {
    return this.repository.findRestaurantWithOwnership(id)
  }

  findUserRestaurants(id: UserId): Promise<Restaurant[]> {
    return this.repository.findUserRestaurants(id)
  }

  async findUserRestaurantsCount(id: UserId): Promise<number> {
    return this.repository.findUserRestaurantsCount(id)
  }

  changeStatus(restaurant: Restaurant, statusId: RestaurantStatusId): Promise<void> {
    return this.repository.changeStatus(restaurant, statusId)
  }

  update(restaurant: Restaurant, payload: UpdateRestaurantDto): Promise<void> {
    return this.repository.update(restaurant, payload)
  }

  destroy(restaurant: Restaurant): Promise<void> {
    return this.repository.destroy(restaurant)
  }
}
