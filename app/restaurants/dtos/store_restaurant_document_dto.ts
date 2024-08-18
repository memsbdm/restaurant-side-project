import { type RestaurantId } from '#restaurants/models/restaurant'

export interface StoreRestaurantDocumentDto {
  restaurantId: RestaurantId
  key: string
  url: string
}
