/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const verifyEmailLimiter = limiter.define('email_verification', () => {
  return limiter.allowRequests(1).every('1 minute')
})

export const forgotPasswordLimiter = limiter.define('forgot_password', () => {
  return limiter.allowRequests(1).every('1 minute')
})

export const verifyTokenLimiter = limiter.define('verify_token', () => {
  return limiter.allowRequests(20).every('1 minute').blockFor('1 hour')
})
