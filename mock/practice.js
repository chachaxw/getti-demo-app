module.exports = function() {
  return [
    {
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
      answer: [
        { id: 0, word: 'we' },
        { id: 5, word: 'each' },
        { id: 6, word: 'have' },
        { id: 7, word: 'a' },
        { id: 1, word: 'dictionary' },
        { id: 4, word: 'to' },
        { id: 3, word: 'help' },
        { id: 8, word: 'us' },
      ],
      answerStr: 'We each have a dictionary to help us.',
    },
    {
      type: 'grammar',
      title: '选出句子当中的同位语成分：',
      sentence: [
        { id: 0, word: 'Alice', selected: false },
        { id: 1, word: 'has', selected: false },
        { id: 2, word: 'two', selected: false },
        { id: 3, word: 'cats', selected: false },
        { id: 4, word: 'Tom', selected: false },
        { id: 5, word: 'and', selected: false },
        { id: 6, word: 'Jerry', selected: false },
      ],
      answer: [
        { id: 2, word: 'two' },
        { id: 3, word: 'cats' },
      ],
      answerStr: 'two cats',
    },
    {
      type: 'select',
      title: '选词填空',
      sentence: 'We each strong point,but each of us on the other hand weak points.(2013.大连二模）',
      options: [
        { id: 0, word: 'has，have' },
        { id: 1, word: 'have，has' },
        { id: 2, word: 'has，has' },
        { id: 3, word: '求助' },
      ],
      answer: { id: 1, word: 'have，has' },
      answerStr: 'have，has',
    },
  ];
}
