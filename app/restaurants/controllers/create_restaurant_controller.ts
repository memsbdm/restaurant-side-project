import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { RestaurantService } from '#restaurants/services/restaurant_service'
import { tuyau } from '#inertia/core/providers/tuyau'

@inject()
export default class CreateRestaurantController {
  static StoreRestaurantValidator = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(4).maxLength(60),
      address: vine.string(),
      postalCode: vine.string().postalCode(),
      city: vine.string(),
      country: vine.string(),
      phone: vine.string().mobile(),
    })
  )

  static OwnershipDocumentValidator = vine.compile(
    vine.object({
      ownershipDocument: vine.file({ size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'pdf'] }),
    })
  )

  constructor(private restaurantService: RestaurantService) {}

  async render({ auth, inertia }: HttpContext) {
    const restaurants = await this.restaurantService.getRestaurantsByUserId(auth.user!.id)
    return inertia.render('restaurants/create_restaurant', { restaurants })
  }

  async execute({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(CreateRestaurantController.StoreRestaurantValidator)
    const { ownershipDocument } = await request.validateUsing(
      CreateRestaurantController.OwnershipDocumentValidator
    )

    const userId = auth.user!.id
    await this.restaurantService.store({ ...payload, userId }, ownershipDocument)

    return response.redirect().toPath(tuyau.$url('owned.restaurants'))
  }
}
