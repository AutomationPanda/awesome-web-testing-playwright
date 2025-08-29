import axios from 'axios';

export const getLocation = async function (this: any) {
  axios.get('/api/location').then(({ data }) => {
    this.pricing.location = data.location;
    this.pricing.currency = data.currency;
    this.pricing.discountEligible = data.discountEligible;
    this.pricing.discountAmount = data.discountAmount;
  });
};
