import * as UserInformation from './user-information'

describe('UserInformation', () => {
  it('saves UserInformation', async () => {
    expect(await UserInformation.retrieve()).toBeNull()
    const now = new Date().getTime()
    const userInformation = {
      id: '0',
      name: 'YutamaKotaro',
      mailAddress: 'yutama.kotaro@example.com',
      photoUrl: 'https://example.com/images/photo.png',
      createdAt: now,
      lastLoginAt: now,
    }
    await UserInformation.save(userInformation)

    const actual = await UserInformation.retrieve()
    expect(actual).toEqual(userInformation)

    await UserInformation.clear()
    expect(await UserInformation.retrieve()).toBeNull()
  })
})
