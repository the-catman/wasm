(module
  (type $t0 (func (param i32)))
  (type $t1 (func))
  (func $imports.conlog (import "imports" "conlog") (type $t0) (param i32))
  (func $test (export "test") (type $t1)
    i32.const 1
    call $imports.conlog)
  (memory $memory (export "memory") 2))
