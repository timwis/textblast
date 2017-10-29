'use-latest'
const twilio = require('twilio')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

module.exports = (sid) => {
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  return client.api.accounts(sid).update({ status: 'closed' })
}
