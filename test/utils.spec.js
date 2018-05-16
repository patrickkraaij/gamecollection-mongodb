'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const utils = require('../utils');
const game1 = { title: 'Zool' };
const game2 = { title: 'After Burner' };

describe('The utils function', () => {
	describe('sortGameTitle', () => {
		it('should return 1 when the titles are in alphabetical order', () => {
			const comparison = utils.sortGameTitle(game1, game2);
			expect(comparison).to.be.a('number');
			expect(comparison).to.equal(1);
		});

		it('should return -1 when the titles are not in alphabetical order', () => {
			const comparison = utils.sortGameTitle(game2, game1);
			expect(comparison).to.be.a('number');
			expect(comparison).to.equal(-1);
		});

		it('should return 0 when there is no needed to sort', () => {
			const comparison = utils.sortGameTitle(game2, game2);
			expect(comparison).to.be.a('number');
			expect(comparison).to.equal(0);
		});
	});
});
