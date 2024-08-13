export const RestaurantStatus = {
  Pending: 1,
  Active: 2,
  Inactive: 3,
  Rejected: 4,
} as const

export type RestaurantStatusId = (typeof RestaurantStatus)[keyof typeof RestaurantStatus]

export const RestaurantStatusText = {
  [RestaurantStatus.Pending]: 'Pending',
  [RestaurantStatus.Active]: 'Active',
  [RestaurantStatus.Inactive]: 'Inactive',
  [RestaurantStatus.Rejected]: 'Rejected',
} as const

export const restaurantStatusDbValues = [
  {
    id: RestaurantStatus.Pending,
    name: RestaurantStatusText[RestaurantStatus.Pending],
  },
  {
    id: RestaurantStatus.Active,
    name: RestaurantStatusText[RestaurantStatus.Active],
  },
  {
    id: RestaurantStatus.Inactive,
    name: RestaurantStatusText[RestaurantStatus.Inactive],
  },
  {
    id: RestaurantStatus.Rejected,
    name: RestaurantStatusText[RestaurantStatus.Rejected],
  },
]
