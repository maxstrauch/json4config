/*!
 * config.json
 * Copyright(c) 2018 Maximilian Strauch
 * MIT Licensed
 */
 
exports = module.exports = {
    normalizeEnvironmentName
};

function normalizeEnvironmentName(bare) {
    
    const envNameMapping = {
        'development':  'dev',
        'devel':        'dev',
        
        'testing':      'test',
        'tester':       'test',
        
        'production':   'prod',
        'product':      'prod',
        'final':        'prod',
        'master':       'prod',
        
        // To be extended ...
    };
    
    // Fallback, if invalid value is given
    if (!bare || !((typeof bare) === 'string')) {
        return 'dev';
    }
    
    let strNormalized = bare.trim().toLowerCase();
    
    // Empty value given
    if (strNormalized.length < 1) {
        return 'dev';
    }
    
    // Check if there is a "translation" existing
    if (strNormalized in envNameMapping) {
        return envNameMapping[bare];
    }
    
    // Return the initial value, so that it is not changed
    return bare;
}
