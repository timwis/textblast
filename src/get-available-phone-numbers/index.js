'use latest'
const twilio = require('twilio')
const omit = require('lodash/omit')
const partialRight = require('lodash/partialRight')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env
const COUNTRY = 'US'
const DANGEROUS_FIELDS = ['_version', '_context', '_solution']
const omitDangerousFields = partialRight(omit, DANGEROUS_FIELDS)

module.exports = async (event) => {
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  const opts = { smsEnabled: true }
  if (event.data.areaCode) opts.areaCode = event.data.areaCode

  const response = await client
    .availablePhoneNumbers(COUNTRY)
    .local
    .list(opts)

  const items = response.map(omitDangerousFields)
  return { data: items }
}
