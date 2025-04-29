const PluginClass = require('./src/connector')

module.exports = {
  PluginVersion: 1,
  PluginClass: PluginClass,
  PluginDesc: {
    name: 'Omilia',
    provider: 'Omilia',
    features: {
      intentResolution: true
    },
    capabilities: [
      {
        name: 'OMILIA_APIKEY',
        label: 'API key',
        type: 'secret',
        required: true
      },
      {
        name: 'OMILIA_REGION',
        label: 'Region',
        type: 'string',
        required: true
      },
      {
        name: 'OMILIA_USER',
        label: 'Client Secret',
        type: 'json',
        advanced: true
      },
      {
        name: 'OMILIA_SEMANTICS',
        label: 'Semantic information',
        type: 'json',
        advanced: true
      },
      {
        name: 'OMILIA_INPUT_FIELDS',
        label: 'Input fields to be passed to the Omilia DiaManT',
        type: 'json',
        advanced: true
      }
    ]
  }
}
