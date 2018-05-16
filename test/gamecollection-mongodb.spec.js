'use strict';

const { beforeEach, afterEach, describe, it } = require('mocha');
const { assert, spy } = require('sinon');
const { expect } = require('chai');
const db = require('../gamecollection-mongodb');
const utils = require('../utils');
let sortGameTitleSpy, sortGamesPerPlatform;

describe('The database function', () => {
	beforeEach(() => {
		sortGameTitleSpy = spy(utils, 'sortGameTitle');
		sortGamesPerPlatform = spy(utils, 'sortGamesPerPlatform');
	});

	afterEach(() => {
		sortGameTitleSpy.restore();
		sortGamesPerPlatform.restore();
	});

	describe('getGames', () => {
		it('returns a list with sorted objects', async () => {
			await db.getGames();
			assert.called(sortGameTitleSpy);
		});
	});

	describe('getGamesPerPlatform', async () => {
		it('returns a list with an object called platform with an arry of games', async () => {
			const result = await db.getGamesPerPlatform();
			assert.called(sortGamesPerPlatform);
			expect(result[0]).to.have.property('platform');
			expect(result[0]).to.have.property('games');
		});
	});

	describe('getGame', () => {
		it('returns a single object', async () => {
			const result = await db.getGame('5981c643bcfa27936a75fe0a');
			expect(result).to.have.property('title');
			expect(result).to.have.property('platform');
			expect(result).to.have.property('releaseDate');
			expect(result).to.have.property('overview');
			expect(result).to.have.property('ESRB');
			expect(result).to.have.property('players');
			expect(result).to.have.property('youtube');
			expect(result).to.have.property('rating');
			expect(result).to.have.property('similar');
			expect(result).to.have.property('publisher');
			expect(result).to.have.property('developer');
			expect(result).to.have.property('genres');
			expect(result).to.have.property('images');
		});
		it('returns an error object because there is no game found', async () => {
			const result = await db.getGame('123412341234');
			expect(result).to.have.property('errorMessage');
		});
	});
});
