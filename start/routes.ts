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
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterProController = () => import('#auth/controllers/register_pro_controller')

router.on('/').renderInertia('home', { version: 6 })
router.on('/protected').renderInertia('protected').middleware(middleware.auth()).as('protected')

// Authentication
router
  .group(() => {
    router.get('/auth/register/pro', [RegisterProController, 'render'])
    router.post('/auth/register/pro', [RegisterProController, 'execute']).as('auth.register.pro')
  })
  .middleware(middleware.guest())

router
  .delete('auth/logout', [LogoutController, 'execute'])
  .middleware(middleware.auth())
  .as('auth.logout')
