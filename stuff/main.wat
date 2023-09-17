(module
  (type (;0;) (func (param i32)))
  (type (;1;) (func (result i32)))
  (type (;2;) (func))
  (type (;3;) (func (param i32 i32)))
  (type (;4;) (func (param i32) (result i32)))
  (type (;5;) (func (param f32)))
  (type (;6;) (func (param i64)))
  (type (;7;) (func (param f64)))
  (type (;8;) (func (result f32)))
  (type (;9;) (func (result i64)))
  (type (;10;) (func (result f64)))
  (func (;0;) (type 2)
    nop)
  (func (;1;) (type 3) (param i32 i32)
    (local i32)
    local.get 1
    i32.load
    local.tee 2
    local.get 2
    local.get 0
    i32.div_u
    local.tee 2
    local.get 0
    i32.mul
    i32.ne
    if  ;; label = @1
      local.get 1
      local.get 2
      i32.const 1
      i32.add
      local.get 0
      i32.mul
      i32.store
    end)
  (func (;2;) (type 4) (param i32) (result i32)
    local.get 0
    i32.const 1025
    i32.sub
    i32.const -2049
    i32.lt_u)
  (func (;3;) (type 0) (param i32)
    (local i32)
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 1072
    i32.add
    local.get 0
    i32.store8
    i32.const 1028
    local.get 1
    i32.const 1
    i32.add
    i32.store)
  (func (;4;) (type 0) (param i32)
    (local i32)
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 3
    i32.and
    if  ;; label = @1
      i32.const 1028
      local.get 1
      i32.const 4
      i32.add
      i32.const -4
      i32.and
      local.tee 1
      i32.store
    end
    i32.const 1032
    i32.load
    local.get 1
    i32.const -4
    i32.and
    i32.add
    local.get 0
    i32.store
    i32.const 1028
    i32.const 1028
    i32.load
    i32.const 4
    i32.add
    i32.store)
  (func (;5;) (type 5) (param f32)
    (local i32)
    i32.const 1028
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 7
    i32.add
    i32.const -4
    i32.and
    i32.store
    i32.const 1036
    i32.load
    local.get 1
    i32.const 3
    i32.add
    i32.const -4
    i32.and
    i32.add
    local.get 0
    f32.store)
  (func (;6;) (type 6) (param i64)
    (local i32)
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 7
    i32.and
    if  ;; label = @1
      i32.const 1028
      local.get 1
      i32.const 8
      i32.add
      i32.const -8
      i32.and
      local.tee 1
      i32.store
    end
    i32.const 1032
    i32.load
    local.get 1
    i32.const 2
    i32.shr_u
    i32.const 1073741820
    i32.and
    i32.add
    local.get 0
    i64.store32
    i32.const 1028
    i32.const 1028
    i32.load
    i32.const 8
    i32.add
    i32.store)
  (func (;7;) (type 7) (param f64)
    (local i32)
    i32.const 1028
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store
    i32.const 1036
    i32.load
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
  (func (;8;) (type 1) (result i32)
    (local i32)
    i32.const 1056
    i32.const 1056
    i32.load
    local.tee 0
    i32.const 1
    i32.add
    i32.store
    local.get 0
    i32.const 1072
    i32.add
    i32.load8_u)
  (func (;9;) (type 1) (result i32)
    (local i32 i32)
    i32.const 1056
    i32.load
    local.tee 0
    i32.const 3
    i32.and
    if  ;; label = @1
      i32.const 1056
      local.get 0
      i32.const 4
      i32.add
      i32.const -4
      i32.and
      local.tee 0
      i32.store
    end
    i32.const 1032
    i32.load
    local.get 0
    i32.const -4
    i32.and
    i32.add
    i32.load
    i32.const 1056
    local.get 0
    i32.const 4
    i32.add
    i32.store)
  (func (;10;) (type 8) (result f32)
    (local f32 i32)
    i32.const 1056
    i32.const 1056
    i32.load
    local.tee 1
    i32.const 7
    i32.add
    i32.const -4
    i32.and
    i32.store
    i32.const 1036
    i32.load
    local.get 1
    i32.const 3
    i32.add
    i32.const -4
    i32.and
    i32.add
    f32.load
    local.tee 0
    f32.const 0x1p+32 (;=4.29497e+09;)
    f32.lt
    local.get 0
    f32.const 0x0p+0 (;=0;)
    f32.ge
    i32.and
    if  ;; label = @1
      local.get 0
      i32.trunc_f32_u
      f32.convert_i32_u
      return
    end
    f32.const 0x0p+0 (;=0;))
  (func (;11;) (type 9) (result i64)
    (local i32)
    i32.const 1056
    i32.const 1056
    i32.load
    local.tee 0
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store
    i32.const 1040
    i32.load
    local.get 0
    i32.const 7
    i32.add
    i32.const 1
    i32.shr_u
    i32.const 2147483640
    i32.and
    i32.add
    i64.load32_u)
  (func (;12;) (type 10) (result f64)
    (local f64 i32)
    i32.const 1056
    i32.const 1056
    i32.load
    local.tee 1
    i32.const 15
    i32.add
    i32.const -8
    i32.and
    i32.store
    i32.const 1044
    i32.load
    local.get 1
    i32.const 7
    i32.add
    i32.const 1
    i32.shr_u
    i32.const 2147483640
    i32.and
    i32.add
    f64.load
    local.tee 0
    f64.const 0x1p+32 (;=4.29497e+09;)
    f64.lt
    local.get 0
    f64.const 0x0p+0 (;=0;)
    f64.ge
    i32.and
    if  ;; label = @1
      local.get 0
      i32.trunc_f64_u
      f64.convert_i32_u
      return
    end
    f64.const 0x0p+0 (;=0;))
  (memory (;0;) 2)
  (global (;0;) i32 (i32.const 1024))
  (global (;1;) i32 (i32.const 1056))
  (global (;2;) i32 (i32.const 1028))
  (global (;3;) i32 (i32.const 1072))
  (global (;4;) i32 (i32.const 1032))
  (global (;5;) i32 (i32.const 1036))
  (global (;6;) i32 (i32.const 1040))
  (global (;7;) i32 (i32.const 1044))
  (global (;8;) i32 (i32.const 1024))
  (global (;9;) i32 (i32.const 3120))
  (global (;10;) i32 (i32.const 1024))
  (global (;11;) i32 (i32.const 68656))
  (global (;12;) i32 (i32.const 131072))
  (global (;13;) i32 (i32.const 0))
  (global (;14;) i32 (i32.const 1))
  (export "memory" (memory 0))
  (export "__wasm_call_ctors" (func 0))
  (export "assertOffset" (func 1))
  (export "assertMemory" (func 2))
  (export "setU8NumberMem" (func 3))
  (export "setU32NumberMem" (func 4))
  (export "setF32NumberMem" (func 5))
  (export "setU64NumberMem" (func 6))
  (export "setF64NumberMem" (func 7))
  (export "getU8NumberMem" (func 8))
  (export "getU32NumberMem" (func 9))
  (export "getF32NumberMem" (func 10))
  (export "getU64NumberMem" (func 11))
  (export "getF64NumberMem" (func 12))
  (export "CUSTOMHEAPLEN" (global 0))
  (export "readoffset" (global 1))
  (export "writeoffset" (global 2))
  (export "CUSTOMHEAPU8" (global 3))
  (export "CUSTOMHEAPU32" (global 4))
  (export "CUSTOMHEAPF32" (global 5))
  (export "CUSTOMHEAPU64" (global 6))
  (export "CUSTOMHEAPF64" (global 7))
  (export "__dso_handle" (global 8))
  (export "__data_end" (global 9))
  (export "__global_base" (global 10))
  (export "__heap_base" (global 11))
  (export "__heap_end" (global 12))
  (export "__memory_base" (global 13))
  (export "__table_base" (global 14))
  (data (;0;) (i32.const 1025) "\08")
  (data (;1;) (i32.const 1029) "\04\00\000\04\00\000\04\00\000\04\00\000\04"))
