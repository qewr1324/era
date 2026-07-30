export function generate(params: any): string {
	return `set(CPM_DOWNLOAD_VERSION 0.38.7)

if(NOT CPM_SOURCE_CACHE)
  set(CPM_SOURCE_CACHE "\${CMAKE_BINARY_DIR}/.cpmcache")
endif()

include(cmake/CPM.cmake)

CPMAddPackage(
  NAME fmt
  GITHUB_REPOSITORY fmtlib/fmt
  VERSION 10.1.1
)

CPMAddPackage(
  NAME spdlog
  GITHUB_REPOSITORY gabime/spdlog
  VERSION 1.12.0
  OPTIONS "SPDLOG_FMT_EXTERNAL ON"
)

CPMAddPackage(
  NAME nlohmann_json
  GITHUB_REPOSITORY nlohmann/json
  VERSION 3.11.2
)`;
}
