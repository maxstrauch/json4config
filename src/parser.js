/*!
 * config.json
 * Copyright(c) 2018 Maximilian Strauch
 * MIT Licensed
 */

exports = module.exports = {
    mergeObjects, 
    parseConfiguration
};

/**
 * Merges the object b into the object a by overwriting config values of a with those of b
 */
function mergeObjects(a, b) {
    return Object.assign({}, a, b);
}

/**
 * Parses a configuration JSON as specified
 *
 * @param cfg The configuration JSON
 * @param envName The configuration JSON environment name to parse
 * @returns The parsed configuration JSON
 */
function parseConfiguration(cfg, envName) {
    // Select the right section based on the current env
    if (!(envName in cfg)) {
        throw new Error("No section for environment `" + envName + "' in config file!");
    }

    let thisCfg = cfg[envName];

    // Overlay the parent configs
    let currentCfg = thisCfg;
    do {
        
        if (!('extends' in currentCfg)) {
            break; // No parent
        }

        if (!(currentCfg.extends in cfg)) {
            throw new Error("No section in environment `" + currentCfg.extends + "' in config file!");
        }
        
        if (currentCfg.extends === envName) {
            throw new Error("Circular extension in config file!");
        }

        currentCfg = cfg[currentCfg.extends];
        thisCfg = mergeObjects(currentCfg, thisCfg);
        delete thisCfg.extends;
        
    } while(true);

    return thisCfg;
}
