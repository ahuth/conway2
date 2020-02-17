console.log('hello world');

const importObject = {
  env: {
    abort: () => {},
  },
};

WebAssembly.instantiateStreaming(fetch('optimized.wasm'), importObject).then(function (module) {
  const exports = module.instance.exports;
  console.log('2 + 3:', exports.add(2, 3));
});
