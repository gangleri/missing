#!/usr/bin/env node

'use strict';

var childProc = require('child_process');

childProc.exec('ls',{cwd: './node_modules'}, function(err, stdout) {
  if(err) {
    console.log('Error: ' + err);
    process.exit(1);
  }

  var folders = stdout.toString().split('\n');
  var pkg = require('../../../package.json');
  var dependencies = (Object.keys(pkg.dependencies || {})).concat((Object.keys(pkg.devDependencies || {})));
  var missing = [];

  for(var i=0; i < folders.length; i++) {
    if(folders[i] !== '' && dependencies.indexOf(folders[i]) < 0) {
      missing.push(folders[i]);
    }
  }

  if(missing.length > 0) {
    console.log('The follwing modules have not been added to your package.json');
    for(var x=0; i < missing.length; x++) {
      console.log('- ' + missing[x]);
    }
    process.exit(1);
  } else {
    process.exit(0);
  }

});

