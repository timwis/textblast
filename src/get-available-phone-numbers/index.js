'use latest'
const twilio = require('twilio')
const { fromEvent } = require('graphcool-lib')
const omit = require('lodash/omit')
const partialRight = require('lodash/partialRight')

const COUNTRY = 'US'
const DANGEROUS_FIELDS = ['_version', '_context', '_solution']
const omitDangerousFields = partialRight(omit, DANGEROUS_FIELDS)

module.exports = async (event) => {
  const auth = event.context.auth
  if (!auth || !auth.nodeId || auth.typeName !== 'User') {
    return { error: 'Insufficient permissions' }
  }

  const userId = auth.nodeId
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const subaccount = await getTwilioSubaccount(userId)

  const client = twilio(subaccount.sid, subaccount.authToken)

  const opts = { smsEnabled: true }
  if (event.data.areaCode) opts.areaCode = event.data.areaCode

  const response = await client
    .availablePhoneNumbers(COUNTRY)
    .local
    .list(opts)

  const items = response.map(omitDangerousFields)
  return { data: items }

  function getTwilioSubaccount (userId) {
    const query = `
      query ($userId: ID!) {
        allTwilioSubaccounts(filter: {
          user: {
            id: $userId
          }
        }) {
          id
          sid
          authToken
          twilioMessagingService {
            sid
          }
        }
      }
    `
    return api.request(query, { userId })
      .then((response) => response.allTwilioSubaccounts[0])
  }
}
