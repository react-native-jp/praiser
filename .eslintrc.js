const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const searchRootDir = p => {
  if (p === '/') {
    throw new Error('root dir is not found')
  }
  if (fs.existsSync(path.join(p, 'package.json'))) {
    return p
  }
  return searchRootDir(path.normalize(path.join(p, '..')))
}

const main = () => {
  try {
    const rootDir = searchRootDir(__dirname)
    const config = yaml.safeLoad(fs.readFileSync(path.join(rootDir, '.eslintrc.yml'), 'utf8'))

    if (config.parserOptions == null) {
      config.parserOptions = {}
    }

    config.parserOptions.tsconfigRootDir = rootDir

    return config
  } catch (e) {
    console.log(e)
  }
}

module.exports = main()
