const path = require('path')
const fs = require('fs')

let pluginBlogIndex
try {
  pluginBlogIndex = require.resolve('@vuepress/plugin-blog')
} catch (e) {
  console.error(e)
  process.exit(1)
}

console.log('@vuepress/plugin-blog found at:', pluginBlogIndex)

let content = fs.readFileSync(pluginBlogIndex, { encoding: 'utf-8' })
content = content.replace('const { layoutComponentMap } =', 'const { themeAPI: { layoutComponentMap }} =')
fs.writeFileSync(pluginBlogIndex, content, { encoding: 'utf-8' })

