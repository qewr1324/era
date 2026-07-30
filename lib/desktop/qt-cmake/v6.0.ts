export function generate(params: any): string {
	return `cmake_minimum_required(VERSION 3.16)
project(MyApp VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets Network)

set(SOURCES
    main.cpp
    mainwindow.cpp
)

set(HEADERS
    mainwindow.h
)

qt_add_executable(MyApp
    MANUAL_FINALIZATION
    \${SOURCES}
    \${HEADERS}
)

target_link_libraries(MyApp PRIVATE
    Qt6::Core
    Qt6::Gui
    Qt6::Widgets
    Qt6::Network
)

target_include_directories(MyApp PRIVATE src/)

set_target_properties(MyApp PROPERTIES
    WIN32_EXECUTABLE TRUE
    MACOSX_BUNDLE TRUE
)

install(TARGETS MyApp
    BUNDLE DESTINATION .
    RUNTIME DESTINATION \${CMAKE_INSTALL_BINDIR}
)`;
}
