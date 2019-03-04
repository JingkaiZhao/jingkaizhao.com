module.exports = {
  title: 'jkzing',
  description: '不定期✍️',
  theme: require.resolve('../../theme'),
  // url: 'https://jkzing.com',
  feed: true,
  author: 'jkzing',
  email: 'jingkai.zhao@foxmail.com',
  themeConfig: {
    headerTitle: 'jkzing',
    website: 'https://github.com/jkzing',
    repo: 'jkzing/jkzing.com',
    nav: [
      { text: 'skills', link: '/skills.html' },
    ]
  },
  markdown: {
    // slugify: 'limax',
    highlightedLineBackground: '#ffe9ad',
    // hideLanguage: true,
    // plugins: [
    //   'markdown-it-footnote'
    // ]
  }
}
