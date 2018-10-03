const { normalizeEnvironmentName } = require('../../src/common');

describe('normalizeEnvironmentName()', function () {
    
    it('should normalize known environment names correctly', function () {
        
        expect(normalizeEnvironmentName('development')).to.be.equal('dev');
        expect(normalizeEnvironmentName('devel')).to.be.equal('dev');
        
        expect(normalizeEnvironmentName('testing')).to.be.equal('test');
        expect(normalizeEnvironmentName('tester')).to.be.equal('test');
        
        expect(normalizeEnvironmentName('production')).to.be.equal('prod');
        expect(normalizeEnvironmentName('product')).to.be.equal('prod');
        expect(normalizeEnvironmentName('final')).to.be.equal('prod');
        expect(normalizeEnvironmentName('master')).to.be.equal('prod');
        
    });
    
    it('should be able to handle undefined input', function () {
        
        expect(normalizeEnvironmentName()).to.be.equal('dev');
        expect(normalizeEnvironmentName(42)).to.be.equal('dev');
        expect(normalizeEnvironmentName(null)).to.be.equal('dev');
        expect(normalizeEnvironmentName('')).to.be.equal('dev');
        expect(normalizeEnvironmentName(' ')).to.be.equal('dev');
        
    });
    
    it('should return a custom environment name untouched', function () {
        
        expect(normalizeEnvironmentName('my-specific-env')).to.be.equal('my-specific-env');
        expect(normalizeEnvironmentName('My-SpeCifIc-enV')).to.be.equal('My-SpeCifIc-enV');
        
    });
  
});
