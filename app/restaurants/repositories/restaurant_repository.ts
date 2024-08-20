import { type StoreRestaurantDto } from '#restaurants/dtos/store_restaurant_dto'
import Restaurant, { type RestaurantId } from '#restaurants/models/restaurant'
import { type UserId } from '#users/models/user'
import type { ListRestaurantsQs } from '#restaurants/controllers/list_restaurants_controller'
import { RestaurantStatus, type RestaurantStatusId } from '#restaurants/enums/restaurant_status'
import { type UpdateRestaurantDto } from '#restaurants/dtos/update_restaurant_dto'

export class RestaurantRepository {
  store(restaurant: StoreRestaurantDto): Promise<Restaurant> {
    return Restaurant.create(restaurant)
  }

  paginate(page: number, perPage: number, qs: ListRestaurantsQs) {
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

  findRestaurantById(id: RestaurantId): Promise<Restaurant | null> {
    return Restaurant.find(id)
  }

  findRestaurantWithOwnership(id: RestaurantId): Promise<Restaurant | null> {
    return Restaurant.query().preload('ownership').where('id', id).first()
  }

  findUserRestaurants(id: UserId): Promise<Restaurant[]> {
    return Restaurant.findManyBy('user_id', id)
  }

  async findUserRestaurantsCount(id: UserId): Promise<number> {
    const q = await Restaurant.query().where('user_id', '=', id).count('*')
    return q[0].$extras.count
  }

  async changeStatus(restaurant: Restaurant, statusId: RestaurantStatusId): Promise<void> {
    restaurant.statusId = statusId
    await restaurant.save()
  }

  async update(restaurant: Restaurant, payload: UpdateRestaurantDto): Promise<void> {
    restaurant.merge(payload)
    await restaurant.save()
  }

  async destroy(restaurant: Restaurant): Promise<void> {
    restaurant.statusId = RestaurantStatus.Deleted
    await restaurant.save()
  }
}
