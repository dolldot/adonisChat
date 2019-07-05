'use strict'

const Chat = use('App/Models/Chat')

class ChatController {

	async index ({ response }) {
		// let chats = await Chat.all()
		let chats = await Chat.query()
		  .with('users')
		  .fetch()

		// return response.json(chats)
		return response.status(200).json({
			message: 'LIST CHAT CONTROLLER',
			data: chats
		})
	}

	async show ({ params, response }) {
		const chat = await Chat.find(params.id)

		return response.json(chat)
	}

	async store ({ request, auth, response }) {
		const chatInfo = request.only(['room_id', 'message'])
		const chat = new Chat()

		try {
			var data = await auth.getUser()

			chat.room_id = chatInfo.room_id
			chat.user_id = data.id
			chat.message = chatInfo.message

			await chat.save()	

			return response.status(200).json(chat)
		} catch (error) {
			response.send({'message': 'Missing or invalid jwt token'})
		}
	}

	async update ({ params, request, response }) {
		const chatInfo = request.only('message')
		const chat = await Chat.find(params.id)

		if(!chat) {
			return response.status(404).json({message: 'Resource not found'})
		}

		chat.message = chatInfo.message

		await chat.save()

		return response.status(200).json(chat)
	}

	async delete ({ params, response }) {
		const chat = await Chat.find(params.id)

		if(!chat){
			return response.status(404).json({message: 'Resource not found'})
		}

		await chat.delete()

		return response.status(204).json(null)
	}
}

module.exports = ChatController
