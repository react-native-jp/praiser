const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function searchProjectRoot(currentPath) {
  if (currentPath === '/') {
    throw new Error('project root is not found')
  }
  if (fs.existsSync(path.join(currentPath, 'package.json'))) {
    return currentPath
  }
  return searchProjectRoot(path.normalize(path.join(currentPath, '..')))
}

function main() {
  const projectRoot = searchProjectRoot(__dirname)
  const config = yaml.safeLoad(fs.readFileSync(path.join(projectRoot, '.eslintrc.yml'), 'utf8'))

  if (config.parserOptions == null) {
    config.parserOptions = {}
  }

  config.parserOptions.tsconfigRootDir = projectRoot

  return config
}

module.exports = main()
