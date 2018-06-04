gamecollection-mongodb
==================

MongoDB wrapper to retrieve data for your game collection

## Table of Contents

1. [Configuration](#configuration)
1. [Require / Import](#require)
2. [Available functions](#functions)

## Configuration
<a name="configuration"></a>
Create a hidden file called `.gamecollection.config.js` in your home directory to make a connection to your MongoDB database.

``` shell
$ touch ~/.gamecollection.config.js
```

``` javascript
module.exports = {
  url: 'mongodb://[username:password@]host1[:port1][/[database][?options]]',
  db: 'nameOfYourDatabase',
  collection: 'games'
};
```

## Require / Import
``` shell
$ yarn add gamecollection-mongodb
```
or
``` shell
$ npm install --save gamecollection-mongodb
```
<a name="configuration"></a>
Require and use it in your application
``` javascript
const gcdb = require('gamecollection-mongodb');
const gamesPerPlatform = await gcdb.getGamesPerPlatform();
```

## Available functions
<a name="functions"></a>

``` javascript
async getGames();
// outputs [{}, {}, ...]
async getGamesPerPlatform();
/* outputs
[
  {
    platform: string,
    games: [{}, {}, ...]
  },
  ...
]
*/
async getGame(mongodbID);
/* outputs
{
  title: string
  platform: array
  releaseDate: string
  overview: string
  ESRB: string
  players: string
  youtube: string
  rating: string
  similar: array
  publisher: string
  developer: string
  genres: array
  images: array
}
*/
async addGame(Object);
async updateGame(mongodbID, field, value);
async deleteGame(mongodbID)
```

## Contributing
<a name="contributing"></a>
When contributing, please respect the ESLint rules and add unit tests.
