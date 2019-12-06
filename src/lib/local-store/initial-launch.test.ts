import * as InitialLaunch from './initial-launch'

describe('InitialLaunch', () => {
  describe('isInitialLaunch', () => {
    it('returns false', async () => {
      expect(await InitialLaunch.isInitialLaunch()).toBe(false)
    })
  })

  describe('markAsTutorialIsDone', () => {
    it('marks tutorial is done', async () => {
      expect(await InitialLaunch.isInitialLaunch()).toBe(false)
      await InitialLaunch.markAsTutorialIsDone()
      expect(await InitialLaunch.isInitialLaunch()).toBe(true)
    })
  })
})
