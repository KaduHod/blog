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
import db from '../app/database/databaseHandler'
import exerciseRepository from 'App/repository/exerciseRepository'
import { ObjectId } from 'mongodb'


Route.group( () => {
  Route.post('/assemble', WorkoutsController.assembleMusclesFormWourkout).as('workouts.assemble')
  Route.get('/exercise-list', WorkoutsController.form).as('workouts.form')
  Route.post('/form-random-workout', WorkoutsController.assembleRandomWorkout).as('workouts.assembleRandomWorkout')
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

Route.get('/test', async ({response}) => {
  let arrIds = ['62f3ea9a76ae245ddc9628f2','62f3ea9a76ae245ddc9628f0'
                ].map( id => new ObjectId(id))
  const exercises = await exerciseRepository.aggregateWithTypesOfMuscles(arrIds)
  console.log(arrIds)
  response.status(200)
  response.header('Content-type','application/json')
  return {exercises}
})

Route.on('/').redirect('/data/muscles')






