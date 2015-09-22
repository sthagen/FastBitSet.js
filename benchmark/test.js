"use strict";

var FastBitSet = require("../FastBitSet.js");
var BitSet = require("bitset.js");
var Benchmark = require('benchmark');
var tBitSet = require("bitset")

function CreateBench() {
    console.log("starting bitmap creation benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    var bt = new tBitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
        bt.set(3*i+5);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    if(bs.cardinality() != bt.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        var b = new FastBitSet();
        for(var i = 0 ; i < 1024  ; i++) {
            b.add(3*i+5);
        }
        return b;
    }  )
    .add('BitSet', function() {
        var bs = new BitSet();
        for(var i = 0 ; i < 1024  ; i++) {
            bs = bs.set(3*i+5,true);
        }
        return bs;
    })
    .add('tdegrunt.BitSet', function() {
        var bt = new tBitSet();
        for(var i = 0 ; i < 1024  ; i++) {
            bt.set(3*i+5);
        }
        return bt;
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}


function CardBench() {
    console.log("starting cardinality benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    var bt = new tBitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
        bt.set(3*i+5);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    if(bs.cardinality() != bt.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        return b.size();
    }  )
    .add('BitSet', function() {
        return bs.cardinality();
    })
    .add('tdegrunt.BitSet', function() {
        return bt.cardinality();
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}

function QueryBench() {
    console.log("starting query benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    var bt = new tBitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
        bt.set(3*i+5);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    if(bs.cardinality() != bt.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        return b.has(122);
    }  )
    .add('BitSet', function() {
        return bs.get(122);
    })
    .add('tdegrunt.BitSet', function() {
        return bt.get(122);
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}

function AndBench() {
    console.log("starting intersection query benchmark");
    var b1 = new FastBitSet();
    var bs1 = new BitSet();
    var bt1 = new tBitSet();
    var b2 = new FastBitSet();
    var bs2 = new BitSet();
    var bt2 = new tBitSet();

    for(var i = 0 ; i < 1024  ; i++) {
        b1.add(3*i+5);
        bs1 = bs1.set(3*i+5,true);
        bt1.set(3*i+5);
        b2.add(6*i+5);
        bs2 = bs2.set(6*i+5,true);
        bt2.set(6*i+5);
    }
    if(bs1.cardinality() != b1.size() ) throw "something is off";
    if(bs1.cardinality() != bt1.cardinality() ) throw "something is off";
    if(bs2.cardinality() != b2.size() ) throw "something is off";
    if(bs2.cardinality() != bt2.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet (creates new bitset)', function() {
        return b1.clone().intersection(b2);
    }  )
    .add('BitSet (creates new bitset)', function() {
        return bs1.and(bs2);
    })
    .add('tdegrunt.BitSet (inplace)', function() {
        return bt1.and(bt2);
    })
    .add('FastBitSet (inplace)', function() {
        return b1.intersection(b2);
    }  )
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}

function OrBench() {
    console.log("starting union query benchmark");
    var b1 = new FastBitSet();
    var bs1 = new BitSet();
    var bt1 = new tBitSet();
    var b2 = new FastBitSet();
    var bs2 = new BitSet();
    var bt2 = new tBitSet();

    for(var i = 0 ; i < 1024  ; i++) {
        b1.add(3*i+5);
        bs1 = bs1.set(3*i+5,true);
        bt1.set(3*i+5);
        b2.add(6*i+5);
        bs2 = bs2.set(6*i+5,true);
        bt2.set(6*i+5);
    }
    if(bs1.cardinality() != b1.size() ) throw "something is off";
    if(bs1.cardinality() != bt1.cardinality() ) throw "something is off";
    if(bs2.cardinality() != b2.size() ) throw "something is off";
    if(bs2.cardinality() != bt2.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet (creates new bitset)', function() {
        return b1.clone().union(b2);
    }  )
    .add('BitSet (creates new bitset)', function() {
        return bs1.or(bs2);
    })
    .add('tdegrunt.BitSet (inplace)', function() {
        return bt1.or(bt2);
    })
    .add('FastBitSet (inplace)', function() {
        return b1.union(b2);
    }  )
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}

function DifferenceBench() {
    console.log("starting difference query benchmark");
    var b1 = new FastBitSet();
    var bs1 = new BitSet();
    var bt1 = new tBitSet();
    var b2 = new FastBitSet();
    var bs2 = new BitSet();
    var bt2 = new tBitSet();

    for(var i = 0 ; i < 1024  ; i++) {
        b1.add(3*i+5);
        bs1 = bs1.set(3*i+5,true);
        bt1.set(3*i+5);
        b2.add(6*i+5);
        bs2 = bs2.set(6*i+5,true);
        bt2.set(6*i+5);
    }
    if(bs1.cardinality() != b1.size() ) throw "something is off";
    if(bs1.cardinality() != bt1.cardinality() ) throw "something is off";
    if(bs2.cardinality() != b2.size() ) throw "something is off";
    if(bs2.cardinality() != bt2.cardinality() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet (creates new bitset)', function() {
        return b1.clone().difference(b2);
    }  )
    .add('BitSet (creates new bitset)', function() {
        return bs1.and(bs2.not());
    })
    .add('tdegrunt.BitSet (inplace)', function() {
        return bt1.andNot(bt2);
    })
    .add('FastBitSet (inplace)', function() {
        return b1.difference(b2);
    }  )
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}

var main = function() {
    console.log("Benchmarking against:");
    console.log("infusion.BitSet.js from https://github.com/infusion/BitSet.js");
    console.log("tdegrunt.BitSet from https://github.com/tdegrunt/bitset");
    console.log("Platform: "+process.platform+" "+process.arch);
    console.log();

    DifferenceBench();
    console.log("");
    AndBench();
    console.log("");
    OrBench();
    console.log("");
    CardBench();
    console.log("");
    CreateBench();
    console.log("");
    QueryBench();
}

if (require.main === module) {
    main();
}