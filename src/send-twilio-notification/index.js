'use latest'
const twilio = require('twilio')
const { fromEvent } = require('graphcool-lib')

module.exports = async (event) => {
  const { id, body, user, recipients } = event.data.Blast.node
  const { sid, authToken } = user.twilioSubaccount
  const notifyServiceSid = user.twilioSubaccount.twilioNotifyService.sid
  const bindings = recipients.map(createBinding)

  const client = twilio(sid, authToken)
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  let notification
  try {
    notification = await client
      .notify
      .services(notifyServiceSid)
      .notifications
      .create({
        toBinding: bindings,
        body
      })
  } catch (err) {
    await saveNotificationFailure()
    return { error: 'Failed to send notification' }
  }

  await saveNotificationSuccess(notification.sid)
  return { data: {} } // Fairly certain no log is generated unless this is returned

  function saveNotificationSuccess (twilioNotificationSid) {
    const mutation = `
      mutation ($id: ID!, $twilioNotificationSid: String!) {
        updateBlast (
          id: $id,
          twilioNotificationSid: $twilioNotificationSid,
          status: SENT
        ) {
          id
        }
      }
    `
    return api.request(mutation, { id, twilioNotificationSid })
  }

  function saveNotificationFailure () {
    const mutation = `
      mutation ($id: ID!) {
        updateBlast(
          id: $id,
          status: FAILED
        ) {
          id
        }
      }
    `
    return api.request(mutation, { id })
  }
}

function createBinding (recipient) {
  return JSON.stringify({
    binding_type: 'sms',
    address: recipient.phoneNumber
  })
}
