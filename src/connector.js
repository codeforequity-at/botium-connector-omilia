const util = require('util')
const debug = require('debug')('botium-connector-omilia')

const SimpleRestContainer = require('botium-core/src/containers/plugins/SimpleRestContainer')
const CoreCapabilities = require('botium-core/src/Capabilities')

const Capabilities = require('./Capabilities')

class BotiumConnector {
  constructor ({ queueBotSays, caps }) {
    this.queueBotSays = queueBotSays
    this.caps = caps
  }

  Validate () {
    debug('Validate called')

    if (!this.caps[Capabilities.OMILIA_APIKEY]) throw new Error('OMILIA_APIKEY capability required')
    if (!this.caps[Capabilities.OMILIA_REGION]) throw new Error('OMILIA_ENVIRONMENT capability required')

    if (!this.delegateContainer) {
      this.delegateCaps = {
        [CoreCapabilities.SIMPLEREST_URL]: `https://${this.caps[Capabilities.OMILIA_REGION]}/chat/dialogs`,
        [CoreCapabilities.SIMPLEREST_METHOD]: 'POST',
        [CoreCapabilities.SIMPLEREST_HEADERS_TEMPLATE]: {
          Authorization: `Bearer ${this.caps[Capabilities.OMILIA_APIKEY]}`,
          'Content-Type': 'application/json'
        },
        [CoreCapabilities.SIMPLEREST_CONTEXT_JSONPATH]: '$',
        [CoreCapabilities.SIMPLEREST_REQUEST_HOOK]: async (params) => {
          const { msg, context, requestOptions } = params
          requestOptions.body = {
            utterance: msg.messageText,
            user: this.caps[Capabilities.OMILIA_USER],
            samantics: this.caps[Capabilities.OMILIA_SEMANTICS],
            input_fields: this.caps[Capabilities.OMILIA_INPUT_FIELDS]
          }
          if (context?.dialog_id) {
            requestOptions.body.dialog_id = context.dialog_id
          }
        },
        [CoreCapabilities.SIMPLEREST_BODY_JSONPATH]: '$',
        [CoreCapabilities.SIMPLEREST_RESPONSE_HOOK]: async ({ botMsg, botMsgRoot }) => {
          this._extractBotText(botMsg, botMsgRoot)
          if (botMsgRoot.outgoing_data?.Intent) {
            botMsg.nlp = { intent: { name: botMsgRoot.outgoing_data.Intent } }
          }
        }
      }
      debug(`Validate delegateCaps ${util.inspect(this.delegateCaps)}`)

      this.delegateCaps = Object.assign({}, this.caps, this.delegateCaps)
      this.delegateContainer = new SimpleRestContainer({ queueBotSays: this.queueBotSays, caps: this.delegateCaps })
    }

    return this.delegateContainer.Validate()
  }

  Build () {
    return this.delegateContainer.Build()
  }

  Start () {
    return this.delegateContainer.Start()
  }

  UserSays (msg) {
    return this.delegateContainer.UserSays(msg)
  }

  Stop () {
    return this.delegateContainer.Stop()
  }

  Clean () {
    this.delegateContainer = null
    return this.delegateContainer.Clean()
  }

  _extractBotText (botMsg, botMsgRoot) {
    const msg = (botMsgRoot.responses || []).map(r => (r.prompts || []).map(p => p.content).join('\n')).join('\n')
    if (msg.length) {
      botMsg.messageText = msg
    }
  }
}

module.exports = BotiumConnector
