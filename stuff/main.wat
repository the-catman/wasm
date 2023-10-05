(module
  (type (;0;) (func))
  (type (;1;) (func (param i32 i32)))
  (type (;2;) (func (param i32)))
  (type (;3;) (func (param f32)))
  (type (;4;) (func (param i64)))
  (type (;5;) (func (param f64)))
  (type (;6;) (func (result i32)))
  (type (;7;) (func (result f32)))
  (type (;8;) (func (result i64)))
  (type (;9;) (func (result f64)))
  (func $__wasm_call_ctors (type 0))
  (func $assertOffset (type 1) (param i32 i32)
    (local i32)
    block  ;; label = @1
      local.get 1
      i32.load
      local.tee 2
      local.get 2
      local.get 0
      i32.div_u
      local.tee 2
      local.get 0
      i32.mul
      i32.eq
      br_if 0 (;@1;)
      local.get 1
      local.get 2
      i32.const 1
      i32.add
      local.get 0
      i32.mul
      i32.store
    end)
  (func $setU8NumberMem (type 2) (param i32)
    (local i32)
    i32.const 0
    i32.load offset=1028
    local.tee 1
    i32.const 1072
    i32.add
    local.get 0
    i32.store8
    i32.const 0
    local.get 1
    i32.const 1
    i32.add
    i32.store offset=1028)
  (func $setU32NumberMem (type 2) (param i32)
    (local i32)
    block  ;; label = @1
      i32.const 0
      i32.load offset=1028
      local.tee 1
      i32.const 3
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      i32.const 0
      local.get 1
      i32.const 4
      i32.add
      i32.const -4
      i32.and
      local.tee 1
      i32.store offset=1028
    end
    i32.const 0
    i32.load offset=1032
    local.get 1
    i32.const -4
    i32.and
    i32.add
    local.get 0
    i32.store
    i32.const 0
    i32.const 0
    i32.load offset=1028
    i32.const 4
    i32.add
    i32.store offset=1028)
  (func $setF32NumberMem (type 3) (param f32)
    (local i32)
    i32.const 0
    i32.const 0
    i32.load offset=1028
    local.tee 1
    i32.const 7
    i32.add
    i32.const -4
    i32.and
    i32.store offset=1028
    i32.const 0
    i32.load offset=1036
    local.get 1
    i32.const 3
    i32.add
    i32.const -4
    i32.and
    i32.add
    local.get 0
    f32.store)
  (func $setU64NumberMem (type 4) (param i64)
    (local i32)
    block  ;; label = @1
      i32.const 0
      i32.load offset=1028
      local.tee 1
      i32.const 7
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      i32.const 0
      local.get 1
      i32.const 8
      i32.add
      i32.const -8
      i32.and
      local.tee 1
      i32.store offset=1028
    end
    i32.const 0
    i32.load offset=1032
    local.get 1
    i32.const 2
    i32.shr_u
    i32.const 1073741820
    i32.and
    i32.add
    local.get 0
    i64.store32
    i32.const 0
    i32.const 0
    i32.load offset=1028
    i32.const 8
    i32.add
    i32.store offset=1028)
  (func $setF64NumberMem (type 5) (param f64)
    (local i32)
    i32.const 0
    i32.const 0
    i32.load offset=1028
    local.tee 1
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store offset=1028
    i32.const 0
    i32.load offset=1036
    local.get 1
    i32.const 7
    i32.add
    i32.const 2
    i32.shr_u
    i32.const 1073741820
    i32.and
    i32.add
    local.get 0
    f32.demote_f64
    f32.store)
  (func $getU8NumberMem (type 6) (result i32)
    (local i32)
    i32.const 0
    i32.const 0
    i32.load offset=1056
    local.tee 0
    i32.const 1
    i32.add
    i32.store offset=1056
    local.get 0
    i32.const 1072
    i32.add
    i32.load8_u)
  (func $getU32NumberMem (type 6) (result i32)
    (local i32 i32)
    block  ;; label = @1
      i32.const 0
      i32.load offset=1056
      local.tee 0
      i32.const 3
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      i32.const 0
      local.get 0
      i32.const 4
      i32.add
      i32.const -4
      i32.and
      local.tee 0
      i32.store offset=1056
    end
    i32.const 0
    i32.load offset=1032
    local.get 0
    i32.const -4
    i32.and
    i32.add
    i32.load
    local.set 1
    i32.const 0
    local.get 0
    i32.const 4
    i32.add
    i32.store offset=1056
    local.get 1)
  (func $getF32NumberMem (type 7) (result f32)
    (local i32 f32)
    i32.const 0
    i32.const 0
    i32.load offset=1056
    local.tee 0
    i32.const 7
    i32.add
    i32.const -4
    i32.and
    i32.store offset=1056
    block  ;; label = @1
      i32.const 0
      i32.load offset=1036
      local.get 0
      i32.const 3
      i32.add
      i32.const -4
      i32.and
      i32.add
      f32.load
      local.tee 1
      f32.const 0x1p+32 (;=4.29497e+09;)
      f32.lt
      local.get 1
      f32.const 0x0p+0 (;=0;)
      f32.ge
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      local.get 1
      i32.trunc_f32_u
      f32.convert_i32_u
      return
    end
    i32.const 0
    f32.convert_i32_u)
  (func $getU64NumberMem (type 8) (result i64)
    (local i32)
    i32.const 0
    i32.const 0
    i32.load offset=1056
    local.tee 0
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store offset=1056
    i32.const 0
    i32.load offset=1040
    local.get 0
    i32.const 7
    i32.add
    i32.const 1
    i32.shr_u
    i32.const 2147483640
    i32.and
    i32.add
    i64.load32_u)
  (func $getF64NumberMem (type 9) (result f64)
    (local i32 f64)
    i32.const 0
    i32.const 0
    i32.load offset=1056
    local.tee 0
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store offset=1056
    block  ;; label = @1
      i32.const 0
      i32.load offset=1044
      local.get 0
      i32.const 7
      i32.add
      i32.const 1
      i32.shr_u
      i32.const 2147483640
      i32.and
      i32.add
      f64.load
      local.tee 1
      f64.const 0x1p+32 (;=4.29497e+09;)
      f64.lt
      local.get 1
      f64.const 0x0p+0 (;=0;)
      f64.ge
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      local.get 1
      i32.trunc_f64_u
      f64.convert_i32_u
      return
    end
    i32.const 0
    f64.convert_i32_u)
  (memory (;0;) 2)
  (global $__stack_pointer (mut i32) (i32.const 68656))
  (global (;1;) i32 (i32.const 1024))
  (global (;2;) i32 (i32.const 1056))
  (global (;3;) i32 (i32.const 1028))
  (global (;4;) i32 (i32.const 1072))
  (global (;5;) i32 (i32.const 1032))
  (global (;6;) i32 (i32.const 1036))
  (global (;7;) i32 (i32.const 1040))
  (global (;8;) i32 (i32.const 1044))
  (global (;9;) i32 (i32.const 1024))
  (global (;10;) i32 (i32.const 3120))
  (global (;11;) i32 (i32.const 1024))
  (global (;12;) i32 (i32.const 68656))
  (global (;13;) i32 (i32.const 131072))
  (global (;14;) i32 (i32.const 0))
  (global (;15;) i32 (i32.const 1))
  (export "memory" (memory 0))
  (export "__wasm_call_ctors" (func $__wasm_call_ctors))
  (export "assertOffset" (func $assertOffset))
  (export "setU8NumberMem" (func $setU8NumberMem))
  (export "setU32NumberMem" (func $setU32NumberMem))
  (export "setF32NumberMem" (func $setF32NumberMem))
  (export "setU64NumberMem" (func $setU64NumberMem))
  (export "setF64NumberMem" (func $setF64NumberMem))
  (export "getU8NumberMem" (func $getU8NumberMem))
  (export "getU32NumberMem" (func $getU32NumberMem))
  (export "getF32NumberMem" (func $getF32NumberMem))
  (export "getU64NumberMem" (func $getU64NumberMem))
  (export "getF64NumberMem" (func $getF64NumberMem))
  (export "CUSTOMHEAPLEN" (global 1))
  (export "readoffset" (global 2))
  (export "writeoffset" (global 3))
  (export "CUSTOMHEAPU8" (global 4))
  (export "CUSTOMHEAPU32" (global 5))
  (export "CUSTOMHEAPF32" (global 6))
  (export "CUSTOMHEAPU64" (global 7))
  (export "CUSTOMHEAPF64" (global 8))
  (export "__dso_handle" (global 9))
  (export "__data_end" (global 10))
  (export "__global_base" (global 11))
  (export "__heap_base" (global 12))
  (export "__heap_end" (global 13))
  (export "__memory_base" (global 14))
  (export "__table_base" (global 15))
  (data $.rodata (i32.const 1024) "\00\08\00\00")
  (data $.data (i32.const 1028) "\00\04\00\000\04\00\000\04\00\000\04\00\000\04\00\00"))
