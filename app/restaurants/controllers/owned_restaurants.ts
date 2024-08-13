import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/services/restaurant_service'

@inject()
export default class OwnedRestaurantsController {
  constructor(private restaurantService: RestaurantService) {}

  async render({ auth, inertia }: HttpContext) {
    const restaurants = await this.restaurantService.getRestaurantsByUserId(auth.user!.id)
    return inertia.render('restaurants/owned_restaurants', { restaurants })
  }
}
