import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/services/restaurant_service'
import { RestaurantStatus } from '#restaurants/enums/restaurant_status'
import { OwnershipDocumentService } from '#restaurants/services/ownership_document_service'
import { tuyau } from '#inertia/core/providers/tuyau'

@inject()
export default class VerifyRestaurantController {
  constructor(
    private restaurantService: RestaurantService,
    private ownershipDocumentService: OwnershipDocumentService
  ) {}

  async render({ inertia, request, response }: HttpContext) {
    const restaurantId = request.param('id')
    const restaurant = await this.restaurantService.findRestaurantWithOwnership(restaurantId)
    if (!restaurant || restaurant.statusId !== RestaurantStatus.Pending)
      return response.redirect().toPath(tuyau.$url('admin.restaurants'))

    return inertia.render('restaurants/verify_restaurant', { restaurant })
  }

  async verify({ request, response }: HttpContext) {
    const id = request.param('id')
    const restaurant = await this.restaurantService.findRestaurantById(id)
    if (!restaurant) return response.redirect().back()

    await this.restaurantService.changeStatus(restaurant, RestaurantStatus.Active)
    await this.ownershipDocumentService.confirm(id)
    return response.redirect().back()
  }

  async reject({ request, response }: HttpContext) {
    const id = request.param('id')
    const restaurant = await this.restaurantService.findRestaurantById(id)
    if (!restaurant) return response.redirect().back()

    await this.restaurantService.changeStatus(restaurant, RestaurantStatus.Rejected)
    await this.ownershipDocumentService.destroy(id)

    return response.redirect().back()
  }
}
