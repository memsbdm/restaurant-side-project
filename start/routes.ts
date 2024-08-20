/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { forgotPasswordLimiter, verifyEmailLimiter, verifyTokenLimiter } from './limiter.js'
import { UserRole } from '#users/enums/user_role'
const EditRestaurantController = () => import('#restaurants/controllers/edit_restaurant_controller')
const VerifyRestaurantController = () =>
  import('#restaurants/controllers/verify_restaurant_controller')
const ListRestaurantsController = () =>
  import('#restaurants/controllers/list_restaurants_controller')
const CreateRestaurantController = () =>
  import('#restaurants/controllers/create_restaurant_controller')
const OwnedRestaurantsController = () =>
  import('#restaurants/controllers/owned_restaurants_controller')
const ResetPasswordController = () => import('#users/controllers/reset_password_controller')
const ForgotPasswordController = () => import('#users/controllers/forgot_password_controller')
const VerifyEmailController = () => import('#users/controllers/verify_email_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterProController = () => import('#auth/controllers/register_pro_controller')

// Global matcher
router.where('id', router.matchers.uuid())

router.on('/').renderInertia('home', { version: 6 })
router.on('/protected').renderInertia('protected').middleware(middleware.auth()).as('protected')

// Authentication
router
  .group(() => {
    router.get('/auth/login', [LoginController, 'render']).as('auth.login')
    router.post('/auth/login', [LoginController, 'execute'])
    router.get('/auth/register/pro', [RegisterProController, 'render']).as('auth.register.pro')
    router.post('/auth/register/pro', [RegisterProController, 'execute'])
  })
  .middleware(middleware.guest())

router
  .delete('/auth/logout', [LogoutController, 'execute'])
  .middleware(middleware.auth())
  .as('auth.logout')

// Email verification
router
  .group(() => {
    router.get('/verify-email', [VerifyEmailController, 'render']).as('verify.email')
    router.get('/verify-email/:token', [VerifyEmailController, 'execute']).as('verify.email.verify')
    router
      .post('verify-email/resend', [VerifyEmailController, 'resend'])
      .use(verifyEmailLimiter)
      .as('verify.email.resend')
  })
  .middleware(middleware.auth())

// Password reset
router
  .group(() => {
    router.get('/forgot-password', [ForgotPasswordController, 'render']).as('forgot.password')
    router
      .post('/forgot-password/send', [ForgotPasswordController, 'execute'])
      .use(forgotPasswordLimiter)
      .as('forgot.password.send')
    router
      .get('/reset-password/reset/:token', [ResetPasswordController, 'render'])
      .use(verifyTokenLimiter)
      .as('reset.password')
    router
      .post('/reset-password/update', [ResetPasswordController, 'execute'])
      .as('reset.password.update')
  })
  .middleware(middleware.guest())

// Restaurants
router
  .group(() => {
    router
      .get('/restaurants/create', [CreateRestaurantController, 'render'])
      .as('restaurant.create')
    router.post('/restaurants/create', [CreateRestaurantController, 'execute'])
    router.get('/restaurants', [OwnedRestaurantsController, 'render']).as('owned.restaurants')
    router.get('/restaurants/:id', [EditRestaurantController, 'render'])
    router
      .put('/restaurants/:id/update', [EditRestaurantController, 'execute'])
      .as('restaurant.update')
  })
  .middleware(middleware.role(UserRole.Pro))

router
  .group(() => {
    router.get('/admin/restaurants', [ListRestaurantsController, 'render']).as('admin.restaurants')
    router
      .get('/admin/restaurants/:id', [VerifyRestaurantController, 'render'])
      .as('admin.restaurants.render')
    router
      .post('/admin/restaurants/:id/verify', [VerifyRestaurantController, 'verify'])
      .as('admin.restaurants.verify')
    router
      .post('/admin/restaurants/:id/reject', [VerifyRestaurantController, 'reject'])
      .as('admin.restaurants.reject')
  })
  .middleware(middleware.role(UserRole.Admin))
