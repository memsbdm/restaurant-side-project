import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import Restaurant from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'

export class RestaurantRepository {
  store(restaurant: StoreRestaurantDto): Promise<Restaurant> {
    return Restaurant.create(restaurant)
  }

  getRestaurantsByUserId(id: UserId) {
    return Restaurant.findManyBy('user_id', id)
  }
}
