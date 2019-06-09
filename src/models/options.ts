type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export abstract class Options {
  startAtValue?: string | number
  orderBy: Order
  limit?: number

  constructor(orderBy: Order, limit?: number, startAtValue?: string | number) {
    this.startAtValue = startAtValue
    this.limit = limit
    this.orderBy = orderBy
  }
}

export class MangaOptions extends Options {
  static get ALPHABET_ASC(): MangaOptions {
    return new MangaOptions(
      { field: 'name', direction: 'asc' },
      Number(process.env.VUE_APP_MANGA_LIMIT)
    )
  }

  static get NEWEST(): MangaOptions {
    return new MangaOptions(
      { field: 'createdAt', direction: 'desc' },
      Number(process.env.VUE_APP_MANGA_LIMIT)
    )
  }
}

export class ChapterOptions extends Options {
  static get ALPHABET_ASC(): ChapterOptions {
    return new ChapterOptions(
      { field: 'name', direction: 'asc' },
      Number(process.env.VUE_APP_CHAPTER_LIMIT)
    )
  }
}

export class PaperOptions extends Options {
  static get INDEX_ASC(): PaperOptions {
    return new PaperOptions(
      { field: 'index', direction: 'asc' },
      Number(process.env.VUE_APP_PAPER_LIMIT),
      0
    )
  }

  static ONE_PAGE_MODE(index: number = 0): PaperOptions {
    return new PaperOptions(
      { field: 'index', direction: 'asc' },
      1,
      index
    )
  }
}

export interface Order {
  field: string
  direction: 'desc' | 'asc' | undefined
}

