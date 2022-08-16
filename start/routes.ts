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
import View from '@ioc:Adonis/Core/View'
import WorkoutsController from '../app/Controllers/Http/WorkoutsController'
import db from '../app/database/databaseHandler'

Route.group( () => {
  Route.post('/assemble', WorkoutsController.assembleMusclesFormWourkout).as('workouts.assemble')
  Route.get('/exercise-list', WorkoutsController.form).as('workouts.form')
  Route.get('/form-random-workout', WorkoutsController.randomWorkout).as('workouts.random-form')
  Route.post('/post-random-workout', WorkoutsController.assembleRandomWorkout).as('workouts.random-form-post')
}).prefix('workouts')

Route.group( async ()=>{
  Route.get('/muscles', async () => {
    const muscles = await db.query({type:'find',collection:'muscles'})
    return {muscles}
  }).as('muscles')

  Route.get('/exercises', async () => {
    const exercises = await db.query({type:'find', collection:'exercises'})
    return {exercises}
  }).as('exercises')

}).prefix('data')

Route.get('/',() => {
 return View.render('index')
}).as('main')






