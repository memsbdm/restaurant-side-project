import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/services/restaurant_service'
import vine from '@vinejs/vine'

@inject()
export default class EditRestaurantController {
  static UpdateRestaurantValidator = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(4).maxLength(60),
      phone: vine.string().mobile(),
    })
  )
  constructor(private restaurantService: RestaurantService) {}

  async render({ auth, inertia, request, response }: HttpContext) {
    const id = request.param('id')
    const restaurant = await this.restaurantService.findRestaurantById(id)
    if (!restaurant || restaurant.userId !== auth.user!.id) return response.redirect().back()

    return inertia.render('restaurants/edit_restaurant', { restaurant })
  }

  async execute({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(EditRestaurantController.UpdateRestaurantValidator)
    const restaurant = await this.restaurantService.findRestaurantById(request.param('id'))
    if (!restaurant || auth.user!.id !== restaurant.userId) {
      return response.redirect().back()
    }

    await this.restaurantService.update(restaurant, payload)

    return response.redirect().back()
  }
}
