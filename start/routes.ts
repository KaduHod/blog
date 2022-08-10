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

import Route from '@ioc:Adonis/Core/Route'
import WorkoutsController from '../app/Controllers/Http/WorkoutsController'

Route.group( () => {
  Route.post('/assemble', WorkoutsController.assembleMusclesForWourkout)
  Route.get('/form', WorkoutsController.form)
}).prefix('workouts')

Route.get('/', (ctx)=>{
  ctx.response.redirect('/workouts/form')
})

Route.get('/test', WorkoutsController.main)





