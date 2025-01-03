interface Item {
  title: string
  value: string
}

interface DocBlock {
  block: string
  items: Item[]
}

export const docData: DocBlock[] = [
  {
    block: 'Дока',
    items: [
      {
        title: '1 Элемент',
        value: 'Описание',
      },
    ],
  },
  {
    block: 'faq',
    items: [
      {
        title: '1 элемент',
        value: 'Описание',
      },
      {
        title: '2 элемент',
        value: 'Описание',
      },
    ],
  },
]
