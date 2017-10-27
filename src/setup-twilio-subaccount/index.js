'use latest'
const twilio = require('twilio')
const { fromEvent } = require('graphcool-lib')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

module.exports = async (event) => {
  console.log(event)
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  const userId = event.data.User.node.id
  const email = event.data.User.node.email

  // Subaccount
  const subaccount = await client.api.accounts.create({ friendlyName: email })

  const subaccountClient = twilio(subaccount.sid, subaccount.authToken)

  // Messaging service
  const messagingService = await subaccountClient.messaging.services.create({
    friendlyName: `${email}'s messaging service`
    // statusCallback: 'http://requestb.in/xxxxxx'
  })

  // Notify service
  const notifyService = await subaccountClient.notify.services.create({
    friendlyName: `${email}'s notify service`,
    messagingServiceSid: messagingService.sid
  })

  // Save to graphcool db
  const savedSubaccount = await saveSubaccount(api, userId, subaccount.sid, subaccount.authToken)
  const savedSubaccountId = savedSubaccount.createTwilioSubaccount.id
  await saveMessagingService(api, savedSubaccountId, messagingService.sid)
  await saveNotifyService(api, savedSubaccountId, notifyService.sid)

  const twilioResources = { subaccount: subaccount.sid, messagingService: messagingService.sid, notifyService: notifyService.sid }
  console.log('Saved twilio resources', JSON.stringify(twilioResources))

  return event
}

function saveSubaccount (api, userId, sid, authToken) {
  const mutation = `
    mutation ($userId: ID!, $sid: String!, $authToken: String!) {
      createTwilioSubaccount(
        userId: $userId,
        sid: $sid,
        authToken: $authToken
      ) {
        id
      }
    }
  `
  return api.request(mutation, { userId, sid, authToken })
}

function saveMessagingService (api, twilioSubaccountId, sid) {
  const mutation = `
    mutation ($twilioSubaccountId: ID!, $sid: String!) {
      createTwilioMessagingService(
        twilioSubaccountId: $twilioSubaccountId,
        sid: $sid
      ) {
        id
      }
    }
  `
  return api.request(mutation, { twilioSubaccountId, sid })
}

function saveNotifyService (api, twilioSubaccountId, sid) {
  const mutation = `
    mutation ($twilioSubaccountId: ID!, $sid: String!) {
      createTwilioNotifyService(
        twilioSubaccountId: $twilioSubaccountId,
        sid: $sid
      ) {
        id
      }
    }
  `
  return api.request(mutation, { twilioSubaccountId, sid })
}
