import { Manga, Chapter, Paper } from '@/models/manga'
import { Options, ChapterOptions, PaperOptions, MangaOptions } from '@/models/options'
import firebase from 'firebase'
import { NotFoundError } from '@/models/error'
import { addMangaRefToGenre } from './genre-api'
import 'firebase/firestore'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference
type Query = firebase.firestore.Query
type CollectionReference = firebase.firestore.CollectionReference

const db = firebase.firestore()

export async function getMangaList(options?: MangaOptions): Promise<Manga[]> {
  const list: Manga[] = []
  let query: Query | CollectionReference = db.collection('mangas')
  query = applyOptions(query, options || MangaOptions.NEWEST)
  const res = await query.get()
  if (res.size === 0) throw new NotFoundError('No manga(s) is available')
  res.forEach(snapshot => {
    list.push(convertToManga(snapshot))
  })
  return list
}

export async function getMangaByID(ref: string | DocumentReference): Promise<Manga> {
  if (typeof ref === 'string') {
    ref = db.collection('mangas').doc(ref)
  }
  const res = await ref.get()
  return convertToManga(res)
}

export async function addManga(manga: Manga): Promise<void> {
  const batch = db.batch()

  if (manga.genres) {
    const selectedGenreList = manga.genres.filter(g => g.isCheck)
    for (const g of selectedGenreList) {
      addMangaRefToGenre(manga.id, g.name, batch)
    }
  }
  const mangaRef = db.collection('mangas').doc(manga.id)

  batch.set(mangaRef, {
    name: manga.name,
    subName: manga.subName,
    author: manga.author,
    banner: manga.banner,
    backBarImgSrc: manga.backBarImgSrc,
    chapterNumber: manga.chapterNumber,
    desc: manga.desc,
    yearStart: manga.yearStart,
    yearEnd: manga.yearEnd,
    createdAt: new Date(),
    modifiedAt: new Date()
  })

  return batch.commit()
}

export async function getChapterList(mangaRef?: string | DocumentReference, options?: ChapterOptions): Promise<Chapter[]> {
  const list: Chapter[] = []
  let query: Query | CollectionReference = db.collection('chapters')
  if (mangaRef) {
    if (typeof mangaRef === 'string') {
      mangaRef = db.collection('mangas').doc(mangaRef)
    }
    query = query.where('mangaRef', '==', mangaRef)
  }
  query = applyOptions(query, options || ChapterOptions.ALPHABET_ASC)
  const res = await query.get()
  if (res.size === 0) throw new NotFoundError('No chapter(s) is available')
  res.forEach(snapshot => {
    list.push(convertToChapter(snapshot))
  })
  return list
}

export async function getChapterByID(ref: string | DocumentReference): Promise<Chapter> {
  if (typeof ref === 'string') {
    ref = db.collection('chapters').doc(ref)
  }
  const res = await ref.get()
  return convertToChapter(res)
}

export async function getPaperList(chapterRef?: string | DocumentReference, options?: PaperOptions): Promise<Paper[]> {
  const list: Paper[] = []
  let query: Query | CollectionReference = db.collection('papers')
  if (chapterRef) {
    if (typeof chapterRef === 'string') {
      chapterRef = db.collection('chapters').doc(chapterRef)
    }
    query = query.where('chapterRef', '==', chapterRef)
  }
  query = applyOptions(query, options || PaperOptions.INDEX_ASC)
  const res = await query.get()
  if (res.size === 0) throw new NotFoundError('No page(s) is available')
  res.forEach(snapshot => {
    list.push(convertToPaper(snapshot))
  })
  return list
}

/***/
/* Internal functions */
/***/
function convertToManga(doc: DocumentSnapshot): Manga {
  const data = doc.data()
  if (!data) throw new NotFoundError('Manga not found')
  return {
    id: doc.id,
    name: data.name,
    subName: data.subName,
    author: data.author,
    banner: data.banner,
    backBarImgSrc: data.backBarImgSrc,
    chapterNumber: data.chapterNumber,
    transChapterNumber: data.transChapterNumber,
    chapterList: [],
    desc: data.desc,
    genres: data.genres || [],
    yearStart: data.yearStart,
    yearEnd: data.yearEnd || -1,
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate()
  }
}

function convertToChapter(doc: DocumentSnapshot): Chapter {
  const data = doc.data()
  if (!data) throw new NotFoundError('Chapter not found')
  return {
    id: doc.id,
    index: data.index,
    name: data.name,
    cardImgSrc: data.cardImgSrc,
    mangaRef: data.mangaRef,
    paperListSize: data.paperListSize,
    paperList: [],
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate()
  }
}

function convertToPaper(doc: DocumentSnapshot): Paper {
  const data = doc.data()
  if (!data) throw new NotFoundError('Paper not found')
  return {
    id: doc.id,
    index: data.index,
    url: data.url,
    chapterRef: data.chapterRef,
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate()
  }
}

function applyOptions(query: Query | CollectionReference, options: Options): Query {
  let resQy = query
  resQy = resQy.orderBy(options.orderBy.field, options.orderBy.direction)
  if (options.startAtValue) resQy = resQy.startAt(options.startAtValue)
  if (options.limit) resQy = resQy.limit(options.limit)
  return resQy
}
