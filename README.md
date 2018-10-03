# config-json

    A simple and minimalist environment-aware configuration provider

## Installation

Run `npm i config-json` and start using it :-)

## Introduction

Use the following code to conveniently get config values for a environment (in this case `prod` - see end of first line):

```javascript
const cfg = require('config-json')('./config.json', 'prod');

console.log(cfg.get('mailing.host'));
console.log(cfg.get('mailing.port', 25)); // <-- Default fallback value
console.log(cfg.config); // <-- Raw config object
```

from a central `config.json` file with the following contents:

```json
{
  "dev": {
    "mailing": {
      "host": "localhost"
    },
    "port": 10001
  },
  "prod": {
    "extends": "dev",
    "mailing": {
        "host": "smtp.gmail.com"
    },
    "port": 80
  },
  "app.mydomain.tld": {
    "extends": "prod",
    "mailing": {
        "host": "custom-smtp.myserver.foo",
        "port": 465,
        "useSSL": true
    }
  }
}
```

## Features

 - Put different config values in a single `config.json` for a NodeJS application
 - Use the keyword `extends` inside an environment configuration to get all config keys from the provided environment. This way overwriting just only _some_ values is very easy
 - It is easy to place config values for different target systems of the same application in one place
 - Provide either as a second parameter the name of the environment or add the commandline switchs `-e prod` or `--env prod` or place it inside the `NODE_ENV` system environment variable
 - Access can be gained either by using the function `get(key, defaultValue)` with a default value or by using the `config` key which contains the entire object
 - See the example in `examples/`
 - Uses tests to ensure working code
 

## ToDo's

 - Tests need to be extended, to also test the commandline switches and `NODE_ENV` system variable
 - This documentation needs to be extended with the optional parameters and the normalization feature of environment names
 
 