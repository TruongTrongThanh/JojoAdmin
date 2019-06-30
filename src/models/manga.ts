type DocumentReference = firebase.firestore.DocumentReference
type Timestamp = firebase.firestore.Timestamp

export interface Manga {
  id: string
  name: string
  subName: string
  author: string
  banner: string
  backBarImgSrc: string
  chapterNumber: number
  transChapterNumber: number
  chapterList: Chapter[]
  desc: string
  genres?: Genre[]
  yearStart: number
  yearEnd: number
  createdAt: Date | Timestamp
  modifiedAt: Date | Timestamp
}
export interface Chapter {
  id: string
  index: number
  name: string
  cardImgSrc: string
  mangaRef: DocumentReference
  paperListSize: number
  paperList: Paper[]
  createdAt: Date | Timestamp
  modifiedAt: Date | Timestamp
}

export interface Paper {
  id: string
  index: number
  url: ImageURL
  chapterRef: DocumentReference
  createdAt: Date | Timestamp
  modifiedAt: Date | Timestamp
}

export interface Genre {
  name: string
  color: string
  isCheck?: boolean
}

export interface ImageURL {
  [field: string]: string
}

