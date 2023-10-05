(async () => {
    let instance = new WebAssembly.Instance(await WebAssembly.compile(require("fs").readFileSync("main.wasm")));
    /** WASM exports. */
    let wasmExports = instance.exports;
    /**
     * WASM's memory.
     * @type {ArrayBuffer}
     */
    let mem = wasmExports.memory.buffer;
    let HEAPU8 = new Uint8Array(mem);
    let HEAPU32 = new Uint32Array(mem);
    let HEAPF32 = new Float32Array(mem);
    let HEAPU64 = new BigUint64Array(mem);
    let HEAPF64 = new Float64Array(mem);

    /** The location of our custom memory in the heap. */
    let custommemptr = wasmExports.CUSTOMHEAPU8.value;
    /** The location of WASM's read offset in the heap. */
    let WASMreadoffsetptr = wasmExports.readoffset.value;
    /** The location of WASM's write offset in the heap. */
    let WASMwriteoffsetptr = wasmExports.writeoffset.value;

    /** The place where we start writing our data to. */
    let writeoffset = 0;

    /* --- Get Array-like --- */

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a string.
     * @param {number} ptr 
     * @param {number} length
     * @returns {string}
     */
    function getString(ptr, length)
    {
        let out = "";
        for(let i = 0; i < length; i++)
        {
            out += String.fromCharCode(HEAPU8[ptr++]);
        }
        return out;
    }

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a Uint8Array.
     * @param {number} ptr 
     * @param {number} length
     * @returns {Uint8Array}
     */
    function getHeapU8(ptr, length)
    {
        let out = new Uint8Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU8[ptr++];
        }
        return out;
    }

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a Uint32Array.
     * @param {number} ptr 
     * @param {number} length
     * @returns {Uint32Array}
     */
    function getHeapU32(ptr, length)
    {
        let out = new Uint32Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU32[ptr >> 2];
            ptr += 4;
        }
        return out;
    }

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a Float32Array.
     * @param {number} ptr 
     * @param {number} length
     * @returns {Float32Array}
     */
    function getHeapF32(ptr, length)
    {
        let out = new Float32Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPF32[ptr >> 2];
            ptr += 4;
        }
        return out;
    }

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a BigUint64Array.
     * @param {number} ptr 
     * @param {number} length
     * @returns {BigUint64Array}
     */
    function getHeapU64(ptr, length)
    {
        let out = new BigUint64Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU64[ptr >> 4];
            ptr += 8;
        }
        return out;
    }

    /**
     * Gets the data held at `ptr` till `ptr + length` in the heap as a Float64Array.
     * @param {number} ptr 
     * @param {number} length
     * @returns {Float64Array}
     */
    function getHeapF64(ptr, length)
    {
        let out = new Float64Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPF64[ptr >> 4];
            ptr += 8;
        }
        return out;
    }

    /* --- Get Array-like --- */

    /* --- Get Number-like --- */

    /**
     * Gets the data held at `ptr` as a character.
     * @param {number} ptr 
     * @returns {string}
     */
    function getChar(ptr)
    {
        return String.fromCharCode(HEAPU8[ptr]);
    }

    /**
     * Gets the data held at `ptr`.
     * @param {number} ptr 
     * @returns {number}
     */
    function getU8Number(ptr)
    {
        return HEAPU8[ptr];
    }

    /**
     * Gets the data held at `ptr`.
     * @param {number} ptr 
     * @returns {number}
     */
    function getU32Number(ptr)
    {
        return HEAPU32[ptr >> 2];
    }

    /**
     * Gets the data held at `ptr`.
     * @param {number} ptr 
     * @returns {number}
     */
    function getF32Number(ptr)
    {
        return HEAPF32[ptr >> 2];
    }

    /**
     * Gets the data held at `ptr`.
     * @param {number} ptr 
     * @returns {bigint}
     */
    function getU64Number(ptr)
    {
        return HEAPU64[ptr >> 4];
    }

    /**
     * Gets the data held at `ptr`.
     * @param {number} ptr 
     * @returns {bigint}
     */
    function getF64Number(ptr)
    {
        return HEAPF64[ptr >> 4];
    }

    /* --- Get Number-like --- */

    /* -- Set Array-like --- */

    /**
     * Sets starting from `ptr` to `value`'s elements' charcodes.
     * @param {number} ptr 
     * @param {string} value 
     * @returns {void}
     */
    function setString(ptr, array)
    {
        for(let elem of array)
        {
            HEAPU8[ptr++] = elem.charCodeAt();
        }
    }

    /**
     * Sets starting from `ptr` to `value`'s elements.
     * @param {number} ptr 
     * @param {number[]} value 
     * @returns {void}
     */
    function setHEAPU8(ptr, array)
    {
        for(let elem of array)
        {
            HEAPU8[ptr++] = elem;
        }
    }

    /**
     * Sets starting from `ptr` to `value`'s elements.
     * @param {number} ptr 
     * @param {number[]} value 
     * @returns {void}
     */
    function setHEAPU32(ptr, array)
    {
        for(let elem of array)
        {
            HEAPU32[ptr >> 2] = elem;
            ptr += 4;
        }
    }

    /**
     * Sets starting from `ptr` to `value`'s elements.
     * @param {number} ptr 
     * @param {number[]} value 
     * @returns {void}
     */
    function setHEAPF32(ptr, array)
    {
        for(let elem of array)
        {
            HEAPF32[ptr >> 2] = elem;
            ptr += 4;
        }
    }

    /**
     * Sets starting from `ptr` to `value`'s elements.
     * @param {number} ptr 
     * @param {bigint[]} value 
     * @returns {void}
     */
    function setHEAPU64(ptr, array)
    {
        for(let elem of array)
        {
            HEAPU64[ptr >> 4] = elem;
            ptr += 8;
        }
    }

    /**
     * Sets starting from `ptr` to `value`'s elements.
     * @param {number} ptr 
     * @param {number[]} value 
     * @returns {void}
     */
    function setHEAPF64(ptr, array)
    {
        for(let elem of array)
        {
            HEAPF64[ptr >> 4] = elem;
            ptr += 8;
        }
    }

    /* -- Set Array-like --- */

    /* --- Set Number-like --- */

    /**
     * Sets the address of `ptr` to `value`'s charcode.
     * @param {number} ptr 
     * @param {string} value 
     * @returns {void}
     */
    function setChar(ptr, value)
    {
        HEAPU8[ptr] = value.charCodeAt();
    }

    /**
     * Sets the address of `ptr` to `value`.
     * @param {number} ptr 
     * @param {number} value 
     * @returns {void}
     */
    function setU8Number(ptr, value)
    {
        HEAPU8[ptr] = value;
    }

    /**
     * Sets the address of `ptr` to `value`.
     * @param {number} ptr 
     * @param {number} value 
     * @returns {void}
     */
    function setU32Number(ptr, value)
    {
        HEAPU32[ptr >> 2] = value;
    }

    /**
     * Sets the address of `ptr` to `value`.
     * @param {number} ptr 
     * @param {number} value 
     * @returns {void}
     */
    function setF32Number(ptr, value)
    {
        HEAPF32[ptr >> 2] = value;
    }

    /**
     * Sets the address of `ptr` to `value`.
     * @param {bigint} ptr 
     * @param {number} value 
     * @returns {void}
     */
    function setU64Number(ptr, value)
    {
        HEAPU64[ptr >> 4] = value;
    }

    /**
     * Sets the address of `ptr` to `value`.
     * @param {number} ptr 
     * @param {number} value 
     * @returns {void}
     */
    function setF64Number(ptr, value)
    {
        HEAPF64[ptr >> 4] = value;
    }

    /* --- Set Number-like --- */

    /** The length of our custom heap. */
    const CUSTOMHEAPLEN = getU32Number(wasmExports.CUSTOMHEAPLEN);

    /** The length of our custom heap divided by two (one section is for wasm to write to JavaScript, and the other is for JavaScript to write to wasm). */
    const READWRITELEN = CUSTOMHEAPLEN / 2;

    /** The place where our data starts to get read from. */
    let readoffset = READWRITELEN;

    /* --- Misc --- */

    /**
     * Aligns the write offset to a rounded-up of `align`.
     * @param {number} align 
     * @fires console.warn Warns if the write offset is not aligned to `align`.
     * @returns {void}
     */
    function assertWriteOffset(align)
    {
        if(writeoffset % align)
        {
            console.warn("Warning: writeoffset not aligned! Aligning...");
            writeoffset = (((writeoffset / align) | 0) + 1) * align; // Round up to the nearest multiple of `align`
        }
    }

    /**
     * Aligns the read offset to a rounded-up of `align`.
     * @param {number} align 
     * @fires console.warn Warns if the read offset is not aligned to `align`.
     * @returns {void}
     */
    function assertReadOffset(align)
    {
        if(readoffset % align)
        {
            console.warn("Warning: readoffset not aligned! Aligning...");
            readoffset = (((readoffset / align) | 0) + 1) * align; // Round up to the nearest multiple of `align`
        }
    }

    /**
     * 
     * @param {number} len 
     * @throws {Error} Will throw an error if `len + writeoffset` is more than what the custom memory can hold.
     * @returns {void}
     */
    function assertMemory(len)
    {
        if((len + writeoffset) > READWRITELEN) throw new Error("Cannot support that much memory!");
    }

    /**
     * Resets the read offset of Javascript back to its original value.
     * @returns {void}
     */
    function resetJSReadOffset()
    {
        readoffset = READWRITELEN;
    }

    /**
     * Resets the write offset of Javascript back to its original value.
     * @returns {void}
     */
    function resetJSWriteOffset()
    {
        writeoffset = 0;
    }

    /**
     * Resets the read offset of WebAssembly back to its original value.
     * @returns {void}
     */
    function resetWASMReadOffset()
    {
        setU32Number(WASMwriteoffsetptr, READWRITELEN);
    }

    /**
     * Resets the write offset of WebAssembly back to its original value.
     * @returns {void}
     */
    function resetWASMWriteOffset()
    {
        setU32Number(WASMreadoffsetptr, 0);
    }

    /**
     * Resets both offsets of JavaScript back to their original values.
     * @returns {void}
     */
    function resetJSOffsets()
    {
        resetJSReadOffset();
        resetJSWriteOffset();
    }

    /**
     * Resets both offsets of WebAssembly back to their original values.
     * @returns {void}
     */
    function resetWASMOffsets()
    {
        resetWASMReadOffset();
        resetWASMWriteOffset();
    }

    /**
     * Resets offsets of both JavaScript and WebAssembly back to their original values.
     * @returns {void}
     */
    function resetOffsets()
    {
        resetJSOffsets();
        resetWASMOffsets();
    }

    /* --- Misc --- */

    /* --- Set Custom-Array-like --- */

    /**
     * Sets the next value in our custom memory to `string`'s elements' charcodes.
     * @param {string} string 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setStringMem(string)
    {
        assertMemory(string.length);
        for(let elem of string)
        {
            HEAPU8[custommemptr + writeoffset++] = elem.charCodeAt();
        }
    }

    /**
     * Sets the next value in our custom memory to `value`'s elements.
     * @param {number[]} array 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU8ArrayMem(array)
    {
        assertMemory(array.length);
        for(let elem of array)
        {
            HEAPU8[custommemptr + writeoffset++] = elem;
        }
    }

    /**
     * Sets the next value in our custom memory to `value`'s elements.
     * @param {number[]} array 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU32ArrayMem(array)
    {
        assertWriteOffset(4);
        assertMemory(array.length << 2);
        for(let elem of array)
        {
            HEAPU32[(custommemptr + writeoffset) >> 2] = elem;
            writeoffset += 4;
        }
    }

    /**
     * Sets the next value in our custom memory to `value`'s elements.
     * @param {number[]} array 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setF32ArrayMem(array)
    {
        assertWriteOffset(4);
        assertMemory(array.length << 2);
        for(let elem of array)
        {
            HEAPF32[(custommemptr + writeoffset) >> 2] = elem;
            writeoffset += 4;
        }
    }

    /**
     * Sets the next value in our custom memory to `value`'s elements.
     * @param {bigint[]} array 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU64ArrayMem(array)
    {
        assertWriteOffset(8);
        assertMemory(array.length << 4);
        for(let elem of array)
        {
            HEAPU64[(custommemptr + writeoffset) >> 4] = elem;
            writeoffset += 8;
        }
    }

    /**
     * Sets the next value in our custom memory to `value`'s elements.
     * @param {number[]} array 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setF64ArrayMem(array)
    {
        assertWriteOffset(8);
        assertMemory(array.length << 4);
        for(let elem of array)
        {
            HEAPF64[(custommemptr + writeoffset) >> 4] = elem;
            writeoffset += 8;
        }
    }

    /* --- Set Custom-Array-like --- */

    /* --- Set Custom-Number-like --- */

    /**
     * Sets the next value in our custom memory to `value`'s charcode.
     * @param {string} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function seCharMem(value)
    {
        assertMemory(1);
        HEAPU8[custommemptr + writeoffset++] = value.charCodeAt();
    }

    /**
     * Sets the next value in our custom memory to `value`.
     * @param {number} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU8NumberMem(value)
    {
        assertMemory(1);
        HEAPU8[custommemptr + writeoffset++] = value;
    }

    /**
     * Sets the next value in our custom memory to `value`.
     * @param {number} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU32NumberMem(value)
    {
        assertWriteOffset(4);
        assertMemory(4);
        HEAPU32[(custommemptr + writeoffset) >> 2] = value;
        writeoffset += 4;
    }

    /**
     * Sets the next value in our custom memory to `value`.
     * @param {number} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setF32NumberMem(value)
    {
        assertWriteOffset(4);
        assertMemory(4);
        HEAPF32[(custommemptr + writeoffset) >> 2] = value;
        writeoffset += 4;
    }

    /**
     * Sets the next value in our custom memory to `value`.
     * @param {bigint} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setU64NumberMem(value)
    {
        assertWriteOffset(8);
        assertMemory(8);
        HEAPU32[(custommemptr + writeoffset) >> 4] = value;
        writeoffset += 8;
    }

    /**
     * Sets the next value in our custom memory to `value`.
     * @param {number} value 
     * @throws {Error} Will throw an error if there is insufficient memory.
     * @returns {void}
     */
    function setF64NumberMem(value)
    {
        assertWriteOffset(8);
        assertMemory(8);
        HEAPF32[(custommemptr + writeoffset) >> 4] = value;
        writeoffset += 8;
    }

    /* --- Set Custom-Number-like --- */

    /* -- Get Custom-Array-like --- */

    /**
     * Returns the next `length` values in our custom memory as a string.
     * @param {number} length
     * @returns {string}
     */
    function getStringMem(length)
    {
        let out = "";
        for(let i = 0; i < length; i++)
        {
            out += String.fromCharCode(HEAPU8[custommemptr + readoffset++]);
        }
        return out;
    }

    /**
     * Returns the next `length` values in our custom memory as a Uint8Array.
     * 
     * Deep copy.
     * @param {number} length
     * @returns {Uint8Array}
     */
    function getU8ArrayMem(length)
    {
        let out = new Uint8Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU8[custommemptr + readoffset++];
        }
        return out;
    }

    /**
     * Returns the next `length` values in our custom memory as a Uint8Array.
     * 
     * Deep copy.
     * @param {number} length
     * @returns {Uint8Array}
     */
    function getU32ArrayMem(length)
    {
        assertReadOffset(4);
        let out = new Uint32Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU32[(custommemptr + readoffset) >> 2];
            readoffset += 4;
        }
        return out;
    }

    /**
     * Returns the next `length` values in our custom memory as a Float32Array.
     * 
     * Deep copy.
     * @param {number} length
     * @returns {Float32Array}
     */
    function getF32ArrayMem(length)
    {
        assertReadOffset(4);
        let out = new Float32Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPF32[(custommemptr + readoffset) >> 2];
            readoffset += 4;
        }
        return out;
    }

    /**
     * Returns the next `length` values in our custom memory as a BigUint64Array.
     * 
     * Deep copy.
     * @param {number} length
     * @returns {BigUint64Array}
     */
    function getU64ArrayMem(length)
    {
        assertReadOffset(8);
        let out = new BigUint64Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPU64[(custommemptr + readoffset) >> 4];
            readoffset += 8;
        }
        return out;
    }

    /**
     * Returns the next `length` values in our custom memory as a Float64Array.
     * 
     * Deep copy.
     * @param {number} length
     * @returns {Float64Array}
     */
    function getF64ArrayMem(length)
    {
        assertReadOffset(8);
        let out = new Float64Array(length);
        for(let i = 0; i < length; i++)
        {
            out[i] = HEAPF64[(custommemptr + readoffset) >> 4];
            readoffset += 8;
        }
        return out;
    }

    /* -- Get Custom-Array-like --- */

    /* -- Get Custom-Number-like --- */

    /**
     * Returns the next value in our custom memory as a character.
     * @returns {string}
     */
    function getCharMem()
    {
        return String.fromCharCode(HEAPU8[custommemptr + readoffset++]);
    }

    /**
     * Returns the next value in our custom memory.
     * @returns {number}
     */
    function getU8NumberMem()
    {
        return HEAPU8[custommemptr + readoffset++];
    }

    /**
     * Returns the next value in our custom memory.
     * @returns {number}
     */
    function getU32NumberMem()
    {
        assertReadOffset(4);
        let out = HEAPU32[(custommemptr + readoffset) >> 2];
        readoffset += 4;
        return out;
    }

    /**
     * Returns the next value in our custom memory.
     * @returns {number}
     */
    function getF32NumberMem()
    {
        assertReadOffset(4);
        let out = HEAPF32[(custommemptr + readoffset) >> 2];
        readoffset += 4;
        return out;
    }

    /**
     * Returns the next value in our custom memory.
     * @returns {bigint}
     */
    function getU64NumberMem()
    {
        assertReadOffset(8);
        let out = HEAPU64[(custommemptr + readoffset) >> 8];
        readoffset += 8;
        return out;
    }

    /**
     * Returns the next value in our custom memory.
     * @returns {number}
     */
    function getF64NumberMem()
    {
        assertReadOffset(8);
        let out = HEAPF64[(custommemptr + readoffset) >> 8];
        readoffset += 8;
        return out;
    }

    /* -- Get Custom-Number-like --- */
})();