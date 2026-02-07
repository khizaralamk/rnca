#!/usr/bin/env node

const { scaffold } = require('../src/index');

scaffold().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
