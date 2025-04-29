require('dotenv').config()
const assert = require('chai').assert
const BotiumConnector = require('../../src/connector')
const { readCaps } = require('./helper')

describe('connector', function () {
  beforeEach(async function () {
    this.caps = readCaps()

    this.queue = []
    this.resolvers = []
    this.poll = async () => {
      if (this.queue.length > 0) {
        return this.queue.shift()
      }
      return new Promise(resolve => {
        this.resolvers.push(resolve)
      })
    }

    const queueBotSays = async (botMsg) => {
      if (this.resolvers.length > 0) {
        const resolve = this.resolvers.shift()
        resolve(botMsg)
      } else {
        this.queue.push(botMsg)
      }
    }
    this.connector = new BotiumConnector({ queueBotSays, caps: this.caps })
    await this.connector.Validate()
    await this.connector.Start()
  })

  it('should successfully get an answer for say hello', async function () {
    let botMsg

    await this.connector.UserSays({ messageText: 'Hello' })
    botMsg = await this.poll()

    // chained message. TODO
    await this.connector.UserSays({ messageText: '' })
    botMsg = await this.poll()

    await this.connector.UserSays({ messageText: 'Can you please tell me my billing information?' })
    console.log('U: Can you please tell me my billing information?')
    botMsg = await this.poll()
    assert.equal(botMsg.nlp?.intent?.name, 'Staples_Billing_Inquiry')
  }).timeout(10000)

  afterEach(async function () {
    await this.connector.Stop()
  })
})
