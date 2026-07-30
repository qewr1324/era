export function generate(params: any): string {
	return `project('myapp', 'c',
  version: '1.0.0',
  meson_version: '>= 0.59.0',
  default_options: ['warning_level=2', 'c_std=c17'])

gtk_dep = dependency('gtk4', version: '>= 4.0.0')
gio_dep = dependency('gio-2.0')

sources = files(
  'src/main.c',
  'src/main_window.c',
  'src/app_config.c',
)

headers = files(
  'src/main_window.h',
  'src/app_config.h',
)

resources = gnome.compile_resources(
  'resources',
  'resources.gresource.xml',
  source_dir: 'data',
)

executable('myapp',
  sources,
  headers,
  resources,
  dependencies: [gtk_dep, gio_dep],
  install: true)

subdir('data')
subdir('po')`;
}
