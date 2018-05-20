const fs = require('fs')
const dotenv = require('dotenv').config()
const request = require('superagent')
const client = require('twilio')(process.env.API_KEY, process.env.API_SECRET);
      
let config = JSON.parse(fs.readFileSync('config.json'))

let test = async () => {
  console.log('Testing SMS')
  await send_sms()
  console.log('Finished testing')
}

let send_sms = async () => {
  try {   
    if (config.SMS_PROVIDER == 'nexmo') {
      let response = await request.post('https://rest.nexmo.com/sms/json')
      .query({ to: process.env.PHONE_NUMBER, from: 'WITNESS', text: 'TEST', api_key: process.env.API_KEY, api_secret: process.env.API_SECRET })
    } else {
      let response = await client.messages
        .create({ to: process.env.PHONE_NUMBER, from: process.env.FROM_NUMBER, body: "TEST twilio" })
    }
    console.log('success', response.text)
  } catch (e) {
    console.error('send_sms', e)
    return false
  }
}

test()
