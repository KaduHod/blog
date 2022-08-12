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
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import WorkoutsController from '../app/Controllers/Http/WorkoutsController'
import db from '../app/database/databaseHandler'


Route.group( () => {
  Route.post('/assemble', WorkoutsController.assembleMusclesFormWourkout)
  Route.get('/exercise-list', WorkoutsController.form)
  Route.post('/form-random-workout', WorkoutsController.assembleRandomWorkout)
}).prefix('workouts')

Route.group( async ()=>{
  Route.get('/muscles', async () => {
    const muscles = await db.query({type:'find',collection:'muscles'})
    return {muscles}
  })

  Route.get('/exercises', async () => {
    const exercises = await db.query({type:'find', collection:'exercises'})
    return {exercises}
  })

}).prefix('data')

Route.on('/').redirect('/data/muscles')






