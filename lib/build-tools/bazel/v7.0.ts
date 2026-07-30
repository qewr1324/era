export function generate(params: any): string {
	return `load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")

cc_library(
    name = "utils",
    srcs = ["utils.cc"],
    hdrs = ["utils.h"],
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "myapp",
    srcs = ["main.cc"],
    deps = [
        ":utils",
        "@fmt",
    ],
)`;
}
