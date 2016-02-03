# superagent-adapter [![Build Status](https://travis-ci.org/theonjs/superagent-adapter.svg?branch=master)](https://travis-ci.org/theonjs/superagent-adapter) [![npm version](https://badge.fury.io/js/theon-superagent-adapter.svg)](https://www.npmjs.com/package/theon-superagent-adapter)

super-agent HTTP agent adapter [theon](http://github.com/h2non/theon).

## Installation

```bash
npm install theon-superagent-adapter --save
```

## Usage

```js
const theon = require('theon')
const superagent = require('theon-superagent-adapter')

// Define your default HTTP agent
theon.agents.set(superagent)

// Declare your API
const api = theon('http://api.server.com')
  .collection('/users')
  .set('Version', '1.0')
  .resource('getById')
  .path('/:id')
  .render()

// Consume your API
api.users
  .getById()
  .param('id', '1234')
  .expect(200)
  .expect('Content-Type', /json/i)
  .expect({ id: 1234, username: 'foo' })
  .end((err, res) => {
    if (err) {
      return console.error('Expect error:', err)
    }
  })
```

## License

MIT
