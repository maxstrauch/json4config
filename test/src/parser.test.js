const { mergeObjects, parseConfiguration } = require('../../src/parser');

describe('mergeObjects()', function () {
    
    it('should merge objects correctly', function () {
        expect(mergeObjects({x: 1}, {x: 2})).to.be.deep.equal({x: 2});
    });
    
    it('should merge objects correctly into each other (a <- b and not a -> b)', function () {
        expect(mergeObjects({x: 1}, {x: 2})).not.to.be.deep.equal({x: 1});
    });
    
    it('should handle undefined input', function () {
        
        expect(mergeObjects({x: 1}, {})).to.be.deep.equal({x: 1});
        expect(mergeObjects({x: 1}, undefined)).to.be.deep.equal({x: 1});
        expect(mergeObjects({x: 1}, null)).to.be.deep.equal({x: 1});
        
        expect(mergeObjects({}, {x: 2})).to.be.deep.equal({x: 2});
        expect(mergeObjects(undefined, {x: 2})).to.be.deep.equal({x: 2});
        expect(mergeObjects(null, {x: 2})).to.be.deep.equal({x: 2});
        
        expect(mergeObjects({}, {})).to.be.deep.equal({});
        expect(mergeObjects()).to.be.deep.equal({});
        
    });
    
});

describe('parseConfiguration()', function () {
    
    it('should parse simple configs easily', function () {
        
        let json = {
            "dev": {
                "x": 1
            }
        };
        
        let result = parseConfiguration(json, 'dev');
        
        expect(result).to.be.deep.equal(json.dev);
    });
    
    it('should handle simple extensions configs easily', function () {
        
        let json = {
            "dev": {
                "x": 1,
                "y": 2
            },
            "prod": {
                "extends": "dev",
                "x": 2
            }
        };
        
        let result = parseConfiguration(json, 'prod');
        
        expect(result).to.be.deep.equal(
            {
                "x": 2,
                "y": 2
            }
        );
    });
    
    it('should handle more-step extensions configs', function () {
        
        let json = {
            "a": {
                "x": 1
            },
            "b": {
                "extends": "a",
                "x": 2
            },
            "c": {
                "extends": "b",
                "x": 3
            }
        };
        
        let result = parseConfiguration(json, 'c');
        
        expect(result).to.be.deep.equal(
            {
                "x": 3
            }
        );
    });
    
    it('should detect circles', function () {
        
        let json = {
            "a": {
                "extends": "c",
                "x": 1
            },
            "b": {
                "extends": "a",
                "x": 2
            },
            "c": {
                "extends": "b",
                "x": 3
            }
        };
        
        expect(function() {
            parseConfiguration(json, 'c')
        }).to.throw('Circular extension in config file!');
    });
    
    it('should detect invalid environment names', function () {
        
        let json = {
        };
        
        expect(function() {
            parseConfiguration(json, 'c')
        }).to.throw();
    });
    
    it('should detect invalid/missing parameters', function () {
        
        expect(function() {
            parseConfiguration()
        }).to.throw();
    });
    
});
