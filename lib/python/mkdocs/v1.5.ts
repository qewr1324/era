export function generate(params: any): string {
	return `site_name: My Project Documentation
site_description: Documentation for My Project
site_author: Developer
site_url: https://docs.example.com

repo_url: https://github.com/user/repo
repo_name: user/repo

theme:
  name: material
  language: en
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - search.suggest
    - search.highlight

plugins:
  - search
  - mkdocstrings

markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - pymdownx.inlinehilite
  - pymdownx.tabbed
  - admonition
  - footnotes
  - toc:
      permalink: true

nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - API Reference: api.md
  - Contributing: contributing.md`;
}
