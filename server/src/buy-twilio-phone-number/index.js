'use latest'
const twilio = require('twilio')
const { fromEvent } = require('graphcool-lib')
const pick = require('lodash/pick')

module.exports = async (event) => {
  const auth = event.context.auth
  if (!auth || !auth.nodeId || auth.typeName !== 'User') {
    return { error: 'Insufficient permissions' }
  }

  const userId = auth.nodeId
  const phoneNumber = event.data.phoneNumber

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const subaccount = await getTwilioSubaccount(userId)
  const messagingService = subaccount.twilioMessagingService
  const client = twilio(subaccount.sid, subaccount.authToken)

  // Purchase phone number
  // https://www.twilio.com/docs/api/rest/test-credentials
  const response = await client
    .incomingPhoneNumbers
    .create({ phoneNumber })
  const phoneNumberSid = response.sid
  event.data.sid = phoneNumberSid

  // Associate phone number with messaging service
  // https://www.twilio.com/docs/api/messaging/services-phone-numbers
  const twilioPhoneNumber = await client
    .messaging
    .services(messagingService.sid)
    .phoneNumbers
    .create({ phoneNumberSid })

  // Save to graphcool db
  const savedTwilioPhoneNumber = await saveTwilioPhoneNumber(twilioPhoneNumber)
  return { data: savedTwilioPhoneNumber }

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

  function saveTwilioPhoneNumber (twilioPhoneNumber) {
    const payload = pick(twilioPhoneNumber, ['sid', 'phoneNumber'])
    payload.twilioSubaccountId = subaccount.id
    const mutation = `
      mutation ($twilioSubaccountId: ID!, $sid: String!, $phoneNumber: String!) {
        createTwilioPhoneNumber (
          twilioSubaccountId: $twilioSubaccountId,
          sid: $sid,
          phoneNumber: $phoneNumber
        ) {
          id
          phoneNumber
        }
      }
    `
    return api.request(mutation, payload)
      .then((response) => response.createTwilioPhoneNumber)
  }
}
