'use strict'
const Room = use('App/Models/Room')

class RoomController {

    async index ({ request, response }) {
        const rooms = await Room.query()
          .with('chats.users')
          .fetch()

        if(!rooms)
            return response.status(404).json({
            message: 'Not found!',
            })

          return response.status(200).json({
            message: 'LIST ROOM CONTROLLER',
            data: rooms
        })

    }

    async room ({ request, response }) {
        const {name} = request.all()

        const reqRoom = await Room.findBy('name', name)

        if(!reqRoom) {
            const room = new Room()

            room.name = name
            await room.save()
            return response.status(201).json(room)
        }
        return response.json(reqRoom)
    }

    async store ({ request, response }) {
        const roomInfo = request.only('name')
        const room = new Room()

        room.name = roomInfo.name

        await room.save()

        return response.status(200).json(room)
    }

    async show ({ params, request, response }) {
        // const room = await Room.find(params.id)
        const room = await Room.query()
          .where('id', params.id)
          .with('chats.users')
          .fetch()

        return response.json(room)
    }

    async list ({ params, request, response }) {
      const room = await Room.query()
        .where('id', params.id)
        .with('users')
        .fetch()

      return response.json(room)
    }

    async update ({ params, request, response }) {
        const roomInfo = request.only('name')
        const room = await Room.find(params.id)

        if(!room) {
            return response.status(404).json({message: 'Resource not found'})
        }

        room.name = roomInfo.name

        await room.save()

        return response.status(200).json(room)
    }

    async delete ({ params, request, response }) {
        const room = await Room.find(params.id)

        if(!room){
            return response.status(404).json({message: 'Resource not found'})
        }

        await room.delete()

        return response.status(204).json(null)
    }
}

module.exports = RoomController
