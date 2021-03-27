import Library from '../../src/models/Book'
import BookService from '../../src/services/book'
import * as dbHelper from '../db-helper'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook() {
  const book = new Library({
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
  return await BookService.createBookService(book)
}

describe('book service', () => {
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
    const book = await createBook()
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('title', 'Fifty Shades of Grey')
    expect(book).toHaveProperty('published', 2011)
  })

  it('should get a book with id', async () => {
    const book = await createBook()
    const found = await BookService.findBookByIdService(Library, book._id)
    expect(found.title).toEqual(book.title)
    expect(found._id).toEqual(book._id)
  })

  it('should not get a non-existing book', async () => {
    expect.assertions(1)
    return BookService.findBookByIdService(Library, nonExistingBookId).catch(
      (e) => {
        expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
      }
    )
  })

  it('should update an existing book', async () => {
    const book = await createBook()
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
    await BookService.updateBookService(Library, book._id, update)
    const updated = await BookService.findBookByIdService(Library, book._id)
    expect(updated).toHaveProperty('_id', book._id)
    expect(updated).toHaveProperty('title', 'Fifty Shades of Grey 3')
    expect(updated).toHaveProperty('published', 2013)
  })

  it('should not update a non-existing book', async () => {
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
    return BookService.updateBookService(
      Library,
      nonExistingBookId,
      update
    ).catch((e) => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should delete an existing book', async () => {
    expect.assertions(1)
    const book = await createBook()
    await BookService.deleteBookService(Library, book._id)
    return BookService.findBookByIdService(Library, book._id).catch((e) => {
      expect(e.message).toBe(`Book ${book._id} not found`)
    })
  })
})
