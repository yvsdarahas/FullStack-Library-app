import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    firstName: 'darahas',
    lastName: 'yeedi',
    email: 'yvsd@gmail.com',
    password: '64646435',
    books: [
      {
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
      },
    ],
  }

  if (override) {
    user = { ...user, ...override }
  }

  return await request(app).post('/api/v1/users').send(user)
}

describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('darahas')
  })

  it('should not create a user with wrong data', async () => {
    const res = await request(app).post('/api/v1/users').send({
      firstName: 'darahas',
      lastName: 'yeedi',
      // email: 'yvsd@gmail.com',
      password: '64646435',
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    res = await request(app).get(`/api/v1/users/${userId}`)

    expect(res.body._id).toEqual(userId)
  })

  it('should not get back a non-existing user', async () => {
    const res = await request(app).get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all users', async () => {
    const res1 = await createUser({
      firstName: 'darahas',
      lastName: 'yeedi',
      email: 'yvsd@gmail.com',
      password: '64646435',
      books: [],
    })
    const res2 = await createUser({
      firstName: 'rohit',
      lastName: 'sharma',
      email: 'rohitSharma@gmail.com',
      password: '64646435',
      books: [],
    })

    const res3 = await request(app).get('/api/v1/users')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      firstName: 'vasantDarahas',
      lastName: 'yeedi',
      email: 'yvsd@integrify.org',
      password: '64646435',
      books: [],
    }

    res = await request(app).patch(`/api/v1/users/${userId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('vasantDarahas')
    expect(res.body.email).toEqual('yvsd@integrify.org')
  })

  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app).delete(`/api/v1/users/${userId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(404)
  })
})
