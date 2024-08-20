import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/services/restaurant_service'
import { UserRole } from '#users/enums/user_role'
import { tuyau } from '#inertia/core/providers/tuyau'
import { RestaurantStatus } from '#restaurants/enums/restaurant_status'

@inject()
export default class DeleteRestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  async execute({ request, auth, response }: HttpContext) {
    const restaurantId = request.param('id')
    const user = auth.user!
    const restaurant = await this.restaurantService.findRestaurantById(restaurantId)

    const restaurantDeletable =
      restaurant?.statusId !== RestaurantStatus.Pending &&
      restaurant?.statusId !== RestaurantStatus.Deleted

    const canDelete = user.roleId === UserRole.Admin || restaurant?.userId === user.id

    if (restaurant && restaurantDeletable && canDelete) {
      await this.restaurantService.destroy(restaurant)
    }

    return response.redirect().toPath(tuyau.$url('owned.restaurants'))
  }
}
