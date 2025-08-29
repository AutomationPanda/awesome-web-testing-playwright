import axios from 'axios'
const jsonServer = require('json-server');
const app = jsonServer.create();

const euCountries = ['BE','EL','LT','PT','BG','ES','LU','RO','CZ','FR','HU','SI','DK','HR','MT','SK','DE','IT','NL','FI','EE','CY','AT','SE','IE','LV','PL']

const discountCountries = [{
  countryCode: 'SK',
  discount: 20
}]

app.get('/', (req, res, next) => { 

  axios
    .get('https://geo.risk3sixty.com/me')
    .then( ({ data }) => {
      
      const locale = data.country
      const countryDiscount = discountCountries.find( c => c.countryCode === locale)
      const result = {
        location: locale.toLowerCase(),
        currency: euCountries.includes(locale) ? 'EUR' : locale === 'UK' ? 'GBP' : 'USD',
        discountEligible: countryDiscount ? true : false,
        discountAmount: countryDiscount?.discount
      }

      const response = res.status(200).jsonp(result);
      return response

    })

});

export default app;
