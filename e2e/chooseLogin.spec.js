import testIDs from "../src/constants/testIDs";
import { elementById, elementByLabel, pressBack } from './lib/utils';

const random = (() => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
})();

describe('All', () => {
  describe('Go to ChooseLogin', () => {
    beforeAll(async () => {
      await device.reloadReactNative();
      // await device.relaunchApp();
    });
    it('Initialページが表示される', async () => {
      await expect(elementById(testIDs.INITIAL)).toBeVisible();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON1)).toBeVisible();
    });

    it('カルーセル2ページ目が表示される', async () => {
      await elementById(testIDs.INITIAL_NEXT_BUTTON1).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON2)).toBeVisible();
    });

    it('カルーセル3ページ目が表示される', async () => {
      await elementById(testIDs.INITIAL_NEXT_BUTTON2).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON3)).toBeVisible();
    });

    it('ChooseLoginページが表示される', async () => {
      await elementById(testIDs.INITIAL_NEXT_BUTTON3).tap();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });
  });


  describe('Go to SignUp', function() {
    it('SignUpページが表示される', async () => {
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
      await elementById(testIDs.SIGN_UP_BTN).tap();
      await expect(elementById(testIDs.SIGN_UP)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_PASSWORD)).toBeVisible();
    });

    it('SignInページが表示される', async () => {
      await pressBack();
      await elementById(testIDs.SIGN_IN_BTN).tap();
      await expect(elementById(testIDs.SIGN_IN)).toBeVisible();
      await expect(elementById(testIDs.SIGN_IN_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_IN_PASSWORD)).toBeVisible();
    });

    it('会員登録できる', async () => {
      await pressBack();
      await elementById(testIDs.SIGN_UP_BTN).tap();
      await expect(elementById(testIDs.SIGN_UP)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_PASSWORD)).toBeVisible();

      await elementById(testIDs.SIGN_UP_EMAIL).replaceText(`e2e+from_detox_${random}@gmail.com`);
      await elementById(testIDs.SIGN_UP_PASSWORD).typeText(`password`);
      await elementById(testIDs.SIGN_UP_REGISTER_BUTTON).tap();

      await expect(elementById(testIDs.HOME)).toBeVisible();
    })
  });
});
