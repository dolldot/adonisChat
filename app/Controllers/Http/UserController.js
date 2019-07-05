'use strict'
const User = use('App/Models/User')
const Room = use('App/Models/Room')

class UserController {

	async login({ request, auth, response }) {
		const { email, password } = request.all()
		
		return auth
		  .authenticator('jwt')
		  .withRefreshToken()
		  .attempt(email,password)
    }

	async index({ request, response }) {
		let users = await User.query()
		  .with('rooms')
		  .fetch()

		// return response.json(chats)
		return response.status(200).json({
			message: 'LIST USER CONTROLLER',
			data: users
		})
	}

	async show({ request, auth, response}) {
		// const user = await User.find(params.id)
		try {
			var data = await auth.getUser()
            let user = await User.query()
              .where('id', data.id)
              .with('rooms.chats')
              .fetch()

			return response.json(user)
		} catch (error) {
			response.send({'message': 'Missing or invalid jwt token'})
		}
    }

    async user({ request, auth, response, params }) {
        const user = await User.find(params.id)
        if(!user) return response.status(404).json({'message': 'User not found'})

        return response.json(user)
    }

	async store ({ request, response }) {
        const userInfo = request.only(['username', 'email', 'password', 'name'])
        const user = new User()

        user.username = userInfo.username
        user.email = userInfo.email
        user.password = userInfo.password

        await user.save()

        if(userInfo.name && userInfo.name.length > 0) {
        	await user.rooms().attach(userInfo.name)
        	user.rooms = await user.rooms().fetch()
        }

        return response.status(201).json(user)
    }

    async group ({ params, request, response }) {
        const room = await Room.find(params.group)
        const user = await User.find(params.id)

        if(!room) {
            return response.status(404).json({'message': 'Group not found!'})
        }

        if(!user) {
            return response.status(404).json({'message': 'User not found!'})
        }

        await user.rooms().attach(room.id)
        user.rooms = await user.rooms().fetch()

        return response.status(201).json(user)
    }

    async update ({ params, request, response }) {
        const userInfo = request.only(['username', 'email', 'password', 'name'])
        const user = await User.find(params.id)

        if(!user) {
        	return response.status(404).json({'message': 'User not found'})
        }

        user.username = userInfo.username
        user.email = userInfo.email
        user.password = userInfo.password

        await user.save()

        if(userInfo.name && userInfo.name.length > 0) {
        	await user.rooms().detach()
        	await user.rooms().attach(userInfo.name)
        	user.rooms = await user.rooms().fetch()
        }

        return response.status(201).json(user)
    }
}

module.exports = UserController
