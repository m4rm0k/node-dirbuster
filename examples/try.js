var dirBuster = require('../src');
var Writable = require('stream').Writable;

var options = {
    list: '../lists/test.txt',
    outStream: new Writable({
        decodeStrings: false,
        objMode: false
    }),
    url: 'https://liftsecurity.io',
    export: 'json',
    methods: ['GET','POST'],
    depth: 2
};

options.outStream.on('error', function(err) {
    console.log('err: ', err);
});

options.outStream._write = function (chunk, enc, next) {
    console.log(chunk.toString('utf8'));
    next();
};

options.outStream.on('end', function() {
    console.log('ended');
    process.exit(1);
});

dirBuster(options);
