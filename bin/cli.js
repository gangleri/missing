#!/usr/bin/env node

'use strict';

var childProc = require('child_process');

childProc.exec('ls',{cwd: './node_modules'}, function(err, stdout) {
  if(err) {
    console.log('Error: ' + err);
    process.exit(1);
  }

  var folders = stdout.split('\n').forEach();
  var pkg = require('./package.json');
  var dependencies = pkg.dependencies.concat(pkg.devDependencies);
  var missing = [];

  for(var i =0; i < folders.length; i++) {
    if(dependencies.indexof(folders[i])) {
      missing.push(folders[i]);
    }
  }

  if(missing.length > 0) {
    console.log('The follwing modules have not been added to your package.json');
    process.exit(1);
  } else {
    process.exit(0);
  }

});
