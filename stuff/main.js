(async () => {
    let instance = (await WebAssembly.instantiate(
        require("fs").readFileSync("main.wasm"),
        {
            imports: {
                conlog(num) {
                    console.log(num);
                }
            }
        }
    )).instance;
    let wasmExports = instance.exports;
    let mem = wasmExports.memory.buffer;
    let HEAPU8 = new Uint8Array(mem);
    let HEAPU32 = new Uint32Array(mem);
    let HEAPF32 = new Float32Array(mem);
    let HEAPU64 = new BigUint64Array(mem);
    let HEAPF64 = new Float64Array(mem);

    wasmExports.test();
})();