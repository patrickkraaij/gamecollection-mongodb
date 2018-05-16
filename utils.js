'use strict';

module.exports = {
	sortGameTitle: (a, b) => {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	},
	sortGamesPerPlatform: (games, platform) => {
		return games.filter((currentValue) => {
			return currentValue.platform === platform;
		}).sort(module.exports.sortGameTitle);
	}
};
