'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
	// static get table () {
	// 	return 'chats'
	// }

	// static get PrimaryKey () {
	// 	return 'id'
	// }
	users () {
		return this.belongsTo('App/Models/User')
	}

	rooms () {
		return this.hasOne('App/Models/Room')
	}
}

module.exports = Chat
