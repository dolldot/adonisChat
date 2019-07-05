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

Route.post('api/v1/auth/login', 'UserController.login')

Route.group(() => {
	Route.get('users', 'UserController.index')
	Route.get('users/logged', 'UserController.show')
	Route.post('users', 'UserController.store')
	Route.put('users/:id', 'UserController.update')
  Route.post('users/:id/:group', 'UserController.group')
  Route.get('users/:id', 'UserController.user')

  Route.post('rooms/find', 'RoomController.room')
	Route.get('rooms', 'RoomController.index')
	Route.get('rooms/:id', 'RoomController.show')
	Route.post('rooms', 'RoomController.store')
	Route.put('rooms/:id', 'RoomController.update')
	Route.delete('rooms/:id', 'RoomController.delete')

  Route.get('rooms/current/:id', 'RoomController.list')

	Route.post('chats', 'ChatController.store')
	Route.get('chats', 'ChatController.index')
	Route.get('chats/:id', 'ChatController.show')
	Route.put('chats/:id', 'ChatController.update')
	Route.delete('chats/:id', 'ChatController.delete')
}).prefix('api/v1').middleware('auth')
