import testIDs from "../src/constants/testIDs";
import { elementById, pressBack } from './lib/utils';

const random = (() =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
)();

describe('All', () => {
  afterAll(async () => {
    await device.resetContentAndSettings().then(() => console.info(' ✨ Reset iOS All Settings 🧹'));
  });

  describe('Go to ChooseLogin', () => {
    beforeAll(async () => {
      await device.launchApp();
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

    xit('カルーセルの表示は一度きり', async () => {
      await device.reloadReactNative();

      await expect(elementById(testIDs.INITIAL)).toBeNotVisible();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });
  });


  describe('Go to SignUp', function() {
    let email;
    let password;

    beforeAll(() => {
      email = `e2e+from_detox_${random}@gmail.com`;
      password = 'password';
    });

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

    it('アカウントを登録できる', async () => {
      await pressBack();
      await elementById(testIDs.SIGN_UP_BTN).tap();
      await expect(elementById(testIDs.SIGN_UP)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_PASSWORD)).toBeVisible();

      await elementById(testIDs.SIGN_UP_EMAIL).typeText(email);
      await elementById(testIDs.SIGN_UP_PASSWORD).typeText(password);
      await elementById(testIDs.SIGN_UP_REGISTER_BUTTON).tap();

      await expect(elementById(testIDs.HOME)).toBeVisible();
    });


    it('サインアウトできる', async () => {
      await elementById(testIDs.MENU_HEADER_LEFT_BUTTON).tap();
      await expect(elementById(testIDs.MENU_DRAWER_ITEMS)).toBeVisible();
      await elementById(testIDs.DRAWER_ITEM_USER_INFO).tap();
      await expect(elementById(testIDs.USER_INFO_SCREEN)).toBeVisible();
      await elementById(testIDs.USER_INFO_SIGN_OUT_BUTTON).tap();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });

    it('サインインできる', async () => {
      await elementById(testIDs.SIGN_IN_BTN).tap();

      await expect(elementById(testIDs.SIGN_IN)).toBeVisible();
      await elementById(testIDs.SIGN_IN_EMAIL).typeText(email);
      await elementById(testIDs.SIGN_IN_PASSWORD).typeText(password);
      await elementById(testIDs.SIGN_IN_EMAIL_BUTTON).tap();

      await expect(elementById(testIDs.HOME)).toBeVisible();
    });
  });
});
