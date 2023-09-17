clang \
   --target=wasm32 \
   -O3 \
   -flto \
   -nostdlib \
   -Wl,--no-entry \
   -Wl,--export-all \
   -Wl,--lto-O3 \
   -o main.wasm \
   main.c \
   && \
wasm2wat \
   main.wasm \
   -o main.wat #\
#   && \
#wasm2js \
#    main.wasm \
#    -o out.mjs