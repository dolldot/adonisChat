'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomUserSchema extends Schema {
  up () {
    this.create('room_users', (table) => {
      table.integer('user_id').unsigned().index('user_id')
      table.integer('room_id').unsigned().index('room_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('room_id').references('rooms.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('room_users')
  }
}

module.exports = RoomUserSchema
