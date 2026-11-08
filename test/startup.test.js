const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function load(relative, dependencies, env = {}) {
  const module = { exports: {} };
  const context = { module, exports: module.exports, require: name => dependencies[name], process: { env }, console: { log() {}, error() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', relative), 'utf8'), context);
  return module.exports;
}
test('missing database configuration fails before connecting', async () => {
  let calls = 0;
  const connect = load('src/db/db.js', { mongoose: { connect: async () => calls++ } });
  await assert.rejects(connect(), /Set MONGO_URI/);
  assert.equal(calls, 0);
});
test('database failure prevents the HTTP listener from opening', async () => {
  let listening = false;
  const { start } = load('server.js', {
    './src/app': { listen() { listening = true; } },
    './src/db/db': async () => { throw Error('offline'); }
  });
  await assert.rejects(start(), /offline/);
  assert.equal(listening, false);
});
test('successful startup connects before listening on configured port', async () => {
  const calls = [];
  const { start } = load('server.js', {
    './src/app': { listen(port) { calls.push(port); return 'server'; } },
    './src/db/db': async () => { calls.push('connected'); }
  }, { PORT: '3020' });
  assert.equal(await start(), 'server');
  assert.deepEqual(calls, ['connected', '3020']);
});
