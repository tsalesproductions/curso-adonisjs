/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/login', 'AuthController.loginIndex')
  Route.post('/login', 'AuthController.login')

  Route.get('/register', 'AuthController.registerIndex')
  Route.post('/register', 'AuthController.register')

  Route.get('/logout', 'authController.logout')


}).prefix('/auth')

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index')
}).middleware(['auth']);

Route.get('/', async ({ view, auth, response }) => {
  if(!auth.isAuthenticated) response.redirect('/auth/login');
  response.redirect('/dashboard');
})

Route.get('/teste', 'TesteController.renderIndex')
Route.post('/testePost', 'TesteController.saveRoute')
Route.get('/post/:id', 'TesteController.getPost')
