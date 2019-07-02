type DocumentReference = firebase.firestore.DocumentReference

export interface Manga {
  id: string
  name: string
  subName: string
  author: string
  banner: string
  backBarImgSrc: string
  chapterNumber: number
  transChapterNumber: number
  desc: string
  yearStart: number
  yearEnd: number
  createdAt: Date
  modifiedAt: Date

  // Collection References
  chapterList?: Chapter[]
  genres?: Genre[]
}
export interface Chapter {
  id: string
  index: number
  name: string
  cardImgSrc: string
  mangaRef: DocumentReference
  paperListSize: number
  paperList: Paper[]
  createdAt: Date
  modifiedAt: Date
}

export interface Paper {
  id: string
  index: number
  url: ImageURL
  chapterRef: DocumentReference
  createdAt: Date
  modifiedAt: Date
}

export interface Genre {
  name: string
  color: string
  isCheck?: boolean
}

export interface ImageURL {
  [field: string]: string
}

