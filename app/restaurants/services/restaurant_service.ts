import { inject } from '@adonisjs/core'
import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import { RestaurantRepository } from '#restaurants/repositories/restaurant_repository'
import type Restaurant from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'

@inject()
export class RestaurantService {
  constructor(private repository: RestaurantRepository) {}

  store(restaurant: StoreRestaurantDto): Promise<Restaurant> {
    return this.repository.store(restaurant)
  }

  getRestaurantsByUserId(id: UserId) {
    return this.repository.getRestaurantsByUserId(id)
  }
}
