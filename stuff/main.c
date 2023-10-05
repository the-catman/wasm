#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#define customHeapLen 2048 // In bytes

/* Our custom heap length. */
const uint32_t CUSTOMHEAPLEN = customHeapLen;
/* Our custom heap. */
uint8_t CUSTOMHEAPU8[customHeapLen];
/* The read offset of this heap. */
uint32_t readoffset = 0;
/* The write offset of this heap. */
uint32_t writeoffset = customHeapLen / 2;
/* HEAPU32 */
uint32_t* CUSTOMHEAPU32 = (uint32_t*)CUSTOMHEAPU8;
/* HEAPF32 */
float* CUSTOMHEAPF32 = (float*)CUSTOMHEAPU8;
/* HEAPU64 */
uint64_t* CUSTOMHEAPU64 = (uint64_t*)CUSTOMHEAPU8;
/* HEAPF64 */
double* CUSTOMHEAPF64 = (double*)CUSTOMHEAPU8;

void assertOffset(uint32_t align, uint32_t *thing)
{
    if(*thing % align)
    {
        *thing = ((*thing / align) + 1) * align; // Round up to the nearest multiple of `align`
    }
}

/*bool assertMemory(uint32_t len)
{
    return (len + customHeapLen / 2) > CUSTOMHEAPLEN;
}*/

/* --- Set Custom-Number-like --- */

/**
 * Sets the next value in our custom memory to `value`.
 */
void setU8NumberMem(uint8_t value)
{
    //assertMemory(1);
    CUSTOMHEAPU8[writeoffset++] = value;
}

/**
 * Sets the next value in our custom memory to `value`.
 */
void setU32NumberMem(uint32_t value)
{
    assertOffset(4, &writeoffset);
    //assertMemory(4);
    CUSTOMHEAPU32[(writeoffset) >> 2] = value;
    writeoffset += 4;
}

/**
 * Sets the next value in our custom memory to `value`.
 */
void setF32NumberMem(float value)
{
    assertOffset(4, &writeoffset);
    //assertMemory(4);
    CUSTOMHEAPF32[(writeoffset) >> 2] = value;
    writeoffset += 4;
}

/**
 * Sets the next value in our custom memory to `value`.
 */
void setU64NumberMem(uint64_t value)
{
    assertOffset(8, &writeoffset);
    //assertMemory(8);
    CUSTOMHEAPU32[(writeoffset) >> 4] = value;
    writeoffset += 8;
}

/**
 * Sets the next value in our custom memory to `value`.
 */
void setF64NumberMem(double value)
{
    assertOffset(8, &writeoffset);
    //assertMemory(8);
    CUSTOMHEAPF32[(writeoffset) >> 4] = value;
    writeoffset += 8;
}

/* --- Set Custom-Number-like --- */

/* --- Get Custom-Number-like --- */

/**
 * Returns the next value in our custom memory.
 */
uint8_t getU8NumberMem()
{
    return CUSTOMHEAPU8[readoffset++];
}

/**
 * Returns the next value in our custom memory.
 */
uint32_t getU32NumberMem()
{
    assertOffset(4, &readoffset);
    uint32_t out = CUSTOMHEAPU32[readoffset >> 2];
    readoffset += 4;
    return out;
}

/**
 * Returns the next value in our custom memory.
 */
float getF32NumberMem()
{
    assertOffset(4, &readoffset);
    uint32_t out = CUSTOMHEAPF32[readoffset >> 2];
    readoffset += 4;
    return out;
}

/**
 * Returns the next value in our custom memory.
 */
uint64_t getU64NumberMem()
{
    assertOffset(8, &readoffset);
    uint32_t out = CUSTOMHEAPU64[readoffset >> 4];
    readoffset += 8;
    return out;
}

/**
 * Returns the next value in our custom memory.
 */
double getF64NumberMem()
{
    assertOffset(8, &readoffset);
    uint32_t out = CUSTOMHEAPF64[readoffset >> 4];
    readoffset += 8;
    return out;
}

/* --- Get Custom-Number-like --- */