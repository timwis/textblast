'use latest'
const twilio = require('twilio')
const { fromEvent } = require('graphcool-lib')

module.exports = async (event) => {
  const { phoneNumber, twilioSubaccountId } = event.data
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const subaccount = await getTwilioSubaccount(twilioSubaccountId)
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
  await client
    .messaging
    .services(messagingService.sid)
    .phoneNumbers
    .create({ phoneNumberSid })

  return event

  function getTwilioSubaccount (id) {
    const query = `
      query ($id: ID!) {
        TwilioSubaccount(id: $id) {
          sid
          authToken
          twilioMessagingService {
            sid
          }
        }
      }
    `
    return api.request(query, { id })
      .then((response) => response.TwilioSubaccount)
  }
}
