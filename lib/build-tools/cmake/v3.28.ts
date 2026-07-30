export function generate(params: any): string {
	return `cmake_minimum_required(VERSION 3.28)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

option(BUILD_TESTS "Build tests" ON)
option(BUILD_DOCS "Build documentation" OFF)

set(SOURCES
    src/main.cpp
    src/utils.cpp
)

set(HEADERS
    include/utils.h
)

add_executable(myapp \${SOURCES} \${HEADERS})

target_include_directories(myapp PRIVATE include)

find_package(fmt REQUIRED)
target_link_libraries(myapp PRIVATE fmt::fmt)

if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()

install(TARGETS myapp DESTINATION bin)
install(FILES \${HEADERS} DESTINATION include)`;
}
