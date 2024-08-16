import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import Restaurant from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'
import type { ListRestaurantsQs } from '#restaurants/controllers/list_restaurants_controller'

export class RestaurantRepository {
  store(restaurant: StoreRestaurantDto): Promise<Restaurant> {
    return Restaurant.create(restaurant)
  }

  getAllPaginated(page: number, perPage: number, qs: ListRestaurantsQs) {
    return Restaurant.query()
      .if(qs.name, (query) => {
        query.whereILike('name', `%${qs.name}%`)
      })
      .if(qs.statusId, (query) => {
        query.where('status_id', '=', `${qs.statusId}`)
      })
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)
  }

  getRestaurantsByUserId(id: UserId): Promise<Restaurant[]> {
    return Restaurant.findManyBy('user_id', id)
  }
}
