# Plz explain what this is.

We have a simple C program (in main.c). We compile this using ./compile.sh, and it produces a webassembly file.

This C program can basically only do maths. Nothing more.

Couple of issues:
We cannot retrieve arrays from functions; we can, however, pass around pointers.
I have written a couple of functions to pass pointers to and from different data types, which is why this file is so giant.

We cannot pass arrays to functions. This is a bit of a kenundrum, because in order for this to work, I have to make my own malloc/free functions, which is not happening.
Instead, what I have done is made a giant array.

You can write values to this array - and I have a set of functions for doing so, and you can read it as well from your C/WebAssembly code.
However, it's not dynamic (can't grow/shrink as you wish).

These functions have a built in counter that increases every time you write data. This means you have to do your own memory management. You never "free" the data,
you just have to overwrite it.

# Insanity disclaimer!

Don't use this if you want to preserve your sanity.

# What are my alternatives for WebAssembly, then?

Just use [emscripten](https://emscripten.org/).