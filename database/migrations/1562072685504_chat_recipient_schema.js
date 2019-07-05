'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatRecipientSchema extends Schema {
  up () {
    this.create('chat_recipients', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().references('id').inTable('chats')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('room_id').unsigned().references('id').inTable('rooms')
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_recipients')
  }
}

module.exports = ChatRecipientSchema
