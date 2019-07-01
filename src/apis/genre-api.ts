import {  Genre } from '@/models/manga'
import firebase from 'firebase'
import { NotFoundError, DuplicateError } from '@/models/error'
import 'firebase/firestore'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference
type Query = firebase.firestore.Query
type CollectionReference = firebase.firestore.CollectionReference
type WriteBatch = firebase.firestore.WriteBatch

const db = firebase.firestore()

export async function getGenreList(): Promise<Genre[]> {
  const list: Genre[] = []
  const query: Query | CollectionReference = db.collection('genres')
  const res = await query.get()
  res.forEach(snapshot => {
    list.push(convertToGenre(snapshot))
  })
  return list
}

export async function addGenre(genre: Genre): Promise<void> {
  const res = await db.collection('genres').doc(genre.name).get()
  if (res.exists) throw new DuplicateError()

  db.collection('genres').doc(genre.name).set({
    color: genre.color
  })
}

export async function addMangaRefToGenre(mangaID: string, genreName: string, batch?: WriteBatch): Promise<void> {
  const mangaRef = db.collection('manga').doc(mangaID)
  const genreRef = db.collection('genres').doc(genreName)
  const updateData = {
    mangaList: firebase.firestore.FieldValue.arrayUnion(mangaRef)
  }
  if (batch) {
    batch.update(genreRef, updateData)
  } else {
    genreRef.update(updateData)
  }
}

export async function deleteGenre(genreName: string): Promise<void> {
  return db.collection('genres').doc(genreName).delete()
}

/***/
/* Internal functions */
/***/
function convertToGenre(doc: DocumentSnapshot): Genre {
  const data = doc.data()
  if (!data) throw new NotFoundError('Genre not found')
  return {
    name: doc.id,
    color: data.color
  }
}