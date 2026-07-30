export function generate(params: any): string {
	return `from conan import ConanFile

class MyProjectConan(ConanFile):
    name = "myproject"
    version = "1.0.0"
    
    settings = "os", "compiler", "build_type", "arch"
    generators = "CMakeDeps", "CMakeToolchain"
    
    default_options = {
        "openssl/*:shared": True,
        "fmt/*:header_only": False,
    }
    
    def requirements(self):
        self.requires("fmt/10.1.1")
        self.requires("spdlog/1.12.0")
        self.requires("nlohmann_json/3.11.2")
    
    def build_requirements(self):
        self.test_requires("gtest/1.14.0")`;
}
