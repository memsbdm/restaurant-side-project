import { type UserId } from '#users/models/user'

export interface StoreRestaurantDto {
  name: string
  address: string
  postalCode: string
  city: string
  country: string
  phone: string
  userId: UserId
}
