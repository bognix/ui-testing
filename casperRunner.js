var casper = require('casper').create({
    logLevel: 'debug',
    verbose: 'true',
    viewportSize: {width: 1366, height: 768}
});

casper.start('http://www.wikia.com', function() {
    this.captureSelector('lorem_pisium.png', '#globalNavigation')
});

casper.run();
