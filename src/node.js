/*!
 * config.json
 * Copyright(c) 2018 Maximilian Strauch
 * MIT Licensed
 */

const fs = require('fs');
const { normalizeEnvironmentName } = require('./common');
const { parseConfiguration } = require('./parser');

exports = module.exports = createApplication;

function createApplication(source, env, opts) {
    opts = opts || {
        silentParsing: false,
        normalizeEnvName: true,
        cmdLineArgsDisabled: false
    };
    
    // Load the configuration source file
    let rawConfig = getSourceConfig(source);
    if (rawConfig == null && opts.silentParsing === false) {
        throw new Error('Failed to read config file: ' + source);
    }
    
    let app = {
        // By default the dev environment is taken
        environmentName: 'dev',
        config: {},
    };
    
    app.get = (key, def) => {
        if (!key) {
            return def;
        }
        
        // Walk along the path
        let path = key.split('.').map((x) => x.trim());
        let current = app.config;
        for (let i = 0; i < path.length; i++) {
            if (path[i] in current) {
                current = current[path[i]];
            } else {
                // Missed, return default
                return def;
            }
        }
        
        // Found
        return current || def;
    };
    
    // Get the name of the desired environment either from ...
    // ... the given parameter (overwrites all)
    if (env && (typeof env) === 'string') {
        
        app.environmentName = env;
        
    }
    // ... the commandline arg (2nd priority, if given)
    else if (!opts.cmdLineArgsDisabled && process.argv && 
        (process.argv.indexOf('--env') > -1 || process.argv.indexOf('-e') > -1)) {
        
        let index = process.argv.indexOf('--env') > -1 ? 
            process.argv.indexOf('--env') : process.argv.indexOf('-e');
        
        if (index < process.argv.length - 1) {
            app.environmentName = process.argv[index + 1];
        } else {
            // No value provided for commandline option
        }
    }
    // ... the NODE_ENV system environment variable
    else if (process.env.NODE_ENV) {
        
        app.environmentName = process.env.NODE_ENV;
        
    }
    
    // Normalize the environment name
    if (opts.normalizeEnvName === true) {
        app.environmentName = normalizeEnvironmentName(app.environmentName);
    }
    
    // Parse the configuration
    try {
         app.config = parseConfiguration(rawConfig, app.environmentName);
    } catch(e) {
        // Failed to parse the configuration
        if (opts.silentParsing === false) {
            throw e;
        }
    }
    
    return app;
}

function getSourceConfig(source) {
    
    if ((typeof source) === 'object') {
        // Assuming that an inline object was given as config
        return source;
    }
    
    if ((typeof source) === 'string') {
        try {
            let fileContents = fs.readFileSync(source, { flag: 'r' }).toString();
            return JSON.parse(fileContents);
        } catch(e) {
            return null;
        }
    }
    
    return null; // Error
}
