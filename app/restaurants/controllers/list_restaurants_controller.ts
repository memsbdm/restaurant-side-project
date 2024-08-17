import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/services/restaurant_service'
import type { RestaurantStatusId } from '#restaurants/enums/restaurant_status'

export interface ListRestaurantsQs {
  name?: string
  statusId?: RestaurantStatusId
  page?: number
}

@inject()
export default class ListRestaurantsController {
  constructor(private restaurantService: RestaurantService) {}

  async render({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const qs: ListRestaurantsQs = request.qs()
    const restaurants = await this.restaurantService.paginate(page, 1, qs)

    return inertia.render('restaurants/list_restaurants', { restaurants, qs })
  }
}
