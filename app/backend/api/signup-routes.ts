const axios = require('axios')
const jws = require('jws-jwk');
const _ = require('lodash')
const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', (req, res, next) => { 

  if (req.body.jwt) {

    const token = req.body.jwt.split('.')[0] 
    const userInfo = req.body.jwt.split('.')[1] 
  
    const { kid } = JSON.parse(Buffer.from(token, 'base64').toString())
    const { email } = JSON.parse(Buffer.from(userInfo, 'base64').toString())

    if (kid && email) {
      axios.get('https://www.googleapis.com/oauth2/v3/certs')
      .then( ({ data: { keys } }) => {
        const jwk = _.find(keys, { kid })
        const validation = jws.verify(req.body.jwt, jwk);
        if (validation) {
          req.body = { email, password: kid }
          next()
        }
        else {
          const response = res.status(401).jsonp('Invalid authorization');

          return response;
        }
      })
    }
    else {
      const response = res.status(401).jsonp('Invalid authorization');
      return response
    }

  }
  else {
    next()
  }

})

export default app;