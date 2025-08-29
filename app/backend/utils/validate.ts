
export const validate = (checks: string[], body, res) => {

  const errors = []
  
  // run validations
  checks.forEach( (check) => {
    !body[check] && errors.push(`\'${check}\'`)
  })

  // create message
  const messageFormatted = errors.length > 1
    ? errors.slice(0, -1).join(', ') + ' and ' + errors.slice(-1)
    : errors[0]

  errors.length &&
    res.status(400).jsonp({
      error: `You need to provide ${messageFormatted} in request body.`
    });

}