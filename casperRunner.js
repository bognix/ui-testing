var casper = require('casper').create({
    logLevel: 'debug',
    verbose: 'true'
});

casper.start(casper.cli.options.url, function() {
    casper.viewport(casper.cli.options.width, casper.cli.options.height, function() {
        this.captureSelector(casper.cli.options.out, casper.cli.options.selector)
    })
});

casper.run();
