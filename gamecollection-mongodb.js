'use strict';

const os = require('os');
const { MongoClient, ObjectId } = require('mongodb');
const utils = require('./utils');
const configFile = require(os.homedir() + '/.gamecollection.config.js');

module.exports = {
	uri: () => {
		try {
			return configFile.url;
		} catch (err) {
			throw err;
		}
	},
	schema: (data) => {
		return {
			title: data.title,
			platform: data.platform,
			releaseDate: data.releaseDate,
			overview: data.overview,
			ESRB: data.ESRB,
			players: data.players,
			youtube: data.youtube,
			rating: data.rating,
			similar: data.similar,
			publisher: data.publisher,
			developer: data.developer,
			genres: data.genres,
			images: data.images
		};
	},
	getGames: async (query) => {
		try {
			const connection = await MongoClient.connect(module.exports.uri());
			const db = connection.db(configFile.db);
			const collection = db.collection(configFile.collection);
			const result = await collection.find(query).toArray();
			connection.close();
			return result.length > 0 ? result.sort(utils.sortGameTitle) : { errorMessage: 'No games found' };
		}
		catch (err) {
			throw err;
		}
	},
	getGamesPerPlatform: async () => {
		try {
			const connection = await MongoClient.connect(module.exports.uri());
			const db = connection.db(configFile.db);
			const collection = db.collection(configFile.collection);
			const result = await collection.find().toArray();
			connection.close();

			if (result.length > 0) {
				const platforms =
					result
						.map((item) => {
							return item['platform'];
						})
						.filter((currentValue, index, array) => {
							return index === array.indexOf(currentValue);
						})
						.sort();

				const gamesPerPlatform =
					platforms.map(item => {
						return {
							platform: item,
							games: utils.sortGamesPerPlatform(result, item)
						};
					});

				return gamesPerPlatform;
			}
			else {
				return { errorMessage: 'No games found' };
			}
		}
		catch (err) {
			throw err;
		}
	},
	getGame: async (id) => {
		try {
			const connection = await MongoClient.connect(module.exports.uri());
			const db = connection.db(configFile.db);
			const collection = db.collection(configFile.collection);
			const result = await collection.findOne({ '_id': ObjectId(id) });
			connection.close();

			return result !== null ? result : { errorMessage: 'Id doesn\'t match any game in the database' };
		}
		catch (err) {
			throw err;
		}
	},
	addGame: async (game) => {
		try {
			const connection = await MongoClient.connect(module.exports.uri());
			const db = connection.db(configFile.db);
			const collection = db.collection(configFile.collection);
			const result = await collection.insertOne(module.exports.schema(game));
			connection.close();
			return result;
		}
		catch (err) {
			throw err;
		}
	},
	deleteGame: async (id) => {
		try {
			const connection = await MongoClient.connect(module.exports.uri());
			const db = connection.db(configFile.db);
			const collection = db.collection(configFile.collection);
			const result = await collection.deleteOne({ '_id': ObjectId(id) });
			connection.close();
			return result;
		}
		catch (err) {
			throw err;
		}
	}
};
