import request from 'supertest'
import { BookDocument } from '../../src/models/Book'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook(override?: Partial<BookDocument>) {
  let book = {
    title: 'Fifty Shades of Grey',
    author: 'E.L.James',
    coverPage:
      'https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg',
    shortDescription:
      'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.',
    published: 2011,
    pages: 356,
    genre: 'romance',
    rating: 3.6,
  }

  if (override) {
    book = { ...book, ...override }
  }

  return await request(app).post('/api/v1/books').send(book)
}

describe('book controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Fifty Shades of Grey')
  })

  it('should not create a book with wrong data', async () => {
    const res = await request(app).post('/api/v1/books').send({
      title: 'Fifty Shades of Grey',
      //   author: 'E.L.James',
      coverPage:
        'https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg',
      //   shortDescription:
      // 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.',
      published: 2011,
      pages: 356,
      genre: 'romance',
      rating: 3.6,
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    res = await request(app).get(`/api/v1/books/${bookId}`)

    expect(res.body._id).toEqual(bookId)
  })

  it('should not get back a non-existing movie', async () => {
    const res = await request(app).get(`/api/v1/movies/${nonExistingBookId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all book', async () => {
    const res1 = await createBook({
      title: 'Fifty Shades of Grey',
      author: 'E.L.James',
      coverPage:
        'https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg',
      shortDescription:
        'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.',
      published: 2011,
      pages: 356,
      genre: 'romance',
      rating: 3.6,
    })
    const res2 = await createBook({
      title: 'Fifty Shades of Grey 2',
      author: 'E.L.James 2',
      coverPage:
        'https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg',
      shortDescription:
        'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.',
      published: 2012,
      pages: 356,
      genre: 'romance',
      rating: 4.6,
    })

    const res3 = await request(app).get('/api/v1/books')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      title: 'Fifty Shades of Grey 3',
      author: 'E.L.James 3',
      coverPage:
        'https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg',
      shortDescription:
        'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.',
      published: 2013,
      pages: 356,
      genre: 'romance',
      rating: 4.3,
    }

    res = await request(app).patch(`/api/v1/books/${bookId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.title).toEqual('Fifty Shades of Grey 3')
    expect(res.body.published).toEqual(2013)
  })

  it('should delete an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app).delete(`/api/v1/books/${bookId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/books/${bookId}`)
    expect(res.status).toBe(404)
  })
})
