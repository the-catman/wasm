__attribute__((import_module("imports"), import_name("conlog"))) void conlog(int num);

__attribute__((visibility("default"))) void test()
{
    conlog(1);
    return;
}