import User from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser() {
  const user = new User({
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
  })
  return await UserService.createUserService(user)
}

describe('user service', () => {
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
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstName', 'darahas')
    expect(user).toHaveProperty('email', 'yvsd@gmail.com')
  })

  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findUserByIdService(User, user._id)
    expect(found.email).toEqual(user.email)
    expect(found._id).toEqual(user._id)
  })

  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return UserService.findUserByIdService(User, nonExistingUserId).catch(
      (e) => {
        expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
      }
    )
  })

  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      firstName: 'vasantDarahas',
      lastName: 'yeedi',
      email: 'yvsd@integrify.org',
      password: '64646435',
      books: [],
    }
    await UserService.updateUserService(User, user._id, update)
    const updated = await UserService.findUserByIdService(User, user._id)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstName', 'vasantDarahas')
    expect(updated).toHaveProperty('email', 'yvsd@integrify.org')
  })

  it('should not update a non-existing user', async () => {
    const update = {
      firstName: 'vasantDarahas',
      lastName: 'yeedi',
      email: 'yvsd@integrify.org',
      password: '64646435',
      books: [],
    }
    return UserService.updateUserService(User, nonExistingUserId, update).catch(
      (e) => {
        expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
      }
    )
  })

  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.deleteUserService(User, user._id)
    return UserService.findUserByIdService(User, user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })
})
