module.exports = function() {
  return {
    0: {
      type: 'translate',
      title: '翻译此句子',
      sentence: '我们每个人都有一本字典来帮助我们。',
      options: [
        { id: 0, word: 'we', selected: false },
        { id: 1, word: 'dictionary', selected: false },
        { id: 2, word: 'dictionaries', selected: false },
        { id: 3, word: 'help', selected: false },
        { id: 4, word: 'to', selected: false },
        { id: 5, word: 'each', selected: false },
        { id: 6, word: 'have', selected: false },
        { id: 7, word: 'a', selected: false },
        { id: 8, word: 'us', selected: false },
        { id: 9, word: 'every', selected: false },
      ],
    },
    1: {
      type: 'summary',
      title: '选出句子当中的同位语成分：',
      sentence: [
        { id: 0, word: 'Alice', },
        { id: 1, word: 'has', },
        { id: 2, word: 'two', },
        { id: 3, word: 'cats', },
        { id: 4, word: 'Tom', },
        { id: 5, word: 'and', },
        { id: 6, word: 'Jerry', },
      ],
    },
    2: {
      type: 'select',
      title: '选词填空',
      sentence: 'We each _____ strong point,but each of us on the other hand _____ weak points.(2013.大连二模）',
      options: [
        { id: 0, word: 'has，have' },
        { id: 1, word: 'have，has' },
        { id: 2, word: 'has，has' },
        { id: 3, word: '求助' },
      ],
    },
  };
}
