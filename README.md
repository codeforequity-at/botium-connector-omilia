# Botium Connector for Omilia 

[![NPM](https://nodei.co/npm/botium-connector-omilia.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-connector-omilia/)

[![Codeship Status for codeforequity-at/botium-connector-omilia](https://app.codeship.com/projects/913b9260-f570-0136-2f32-1e71af04627f/status?branch=master)](https://app.codeship.com/projects/320855)
[![npm version](https://badge.fury.io/js/botium-connector-omilia.svg)](https://badge.fury.io/js/botium-connector-omilia)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

This is a [Botium](https://github.com/codeforequity-at/botium-core) connector for testing your Omilia chatbot.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles ? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## How it works ?
Botium uses a [Omilia Chat API](https://learn.ocp.ai/guides/chat-api-rest-api) to connect to your chatbot.

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.at)

## Requirements

* __Node.js and NPM__
* a __Omilia chatbot__
* a __project directory__ on your workstation to hold test cases and Botium configuration

## Install Botium and Omilia Webhook Connector

When using __Botium CLI__:

```
> npm install -g botium-cli
> npm install -g botium-connector-omilia
> botium-cli init
> botium-cli run
```

When using __Botium Bindings__:

```
> npm install -g botium-bindings
> npm install -g botium-connector-omilia
> botium-bindings init mocha
> npm install && npm run mocha
```

When using __Botium Box__:

_Already integrated into Botium Box, no setup required_

## Connecting your Kore.ai chatbot to Botium

Omilia API key, and chatbot region is required to connect your Botium instance to your Omilia chatbot.

Open the file _botium.json_ in your working directory and add the Webhook settings.

```
{
  "botium": {
    "Capabilities": {
      "PROJECTNAME": "<whatever>",
      "CONTAINERMODE": "omilia",
      "OMILIA_APIKEY": "...",
      "OMILIA_REGION": "..."
    }
  }
}
```
Botium setup is ready, you can begin to write your [BotiumScript](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting) files.

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __omilia__ to activate this connector.

### OMILIA_APIKEY
Omilia API key

### OMILIA_REGION
Omilia region

### OMILIA_USER
Omilia user info, following this format:
```
{
   "user_id": "string",
   "email": "string",
   "first_name": "string",
   "last_name": "string",
   "fullname": "string",
   "phone_number": "string",
   "username": "string"
}
```

### OMILIA_SEMANTICS
Contains key-value string pairs with semantic information related to the request.

### OMILIA_INPUT_FIELDS
Contains input fields to be passed to the Omilia DiaManT
