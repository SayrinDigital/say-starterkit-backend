'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
    Route.get('tasks','TaskController.index')
    Route.get('tasks/:id','TaskController.show')
    Route.post('tasks','TaskController.store')
    Route.put('tasks/:id','TaskController.update')
    Route.delete('tasks/:id','TaskController.delete')
}).prefix('api')

Route.group(()=> {
    Route.post('login', 'UserController.login')
    Route.post('register', 'UserController.register')
    Route.post('logout', 'UserController.logout')
    Route.put('users/:id', 'UserController.update').middleware(['auth'])
    Route.get('users/me', 'UserController.show').middleware(['auth'])
    Route.get('users/update', 'UserController.update')
}).prefix('api/auth')

Route.group(() => {
    Route.post('roles', 'RoleController.store')
}).prefix('api')
