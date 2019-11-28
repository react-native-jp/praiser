import testIDs from "../src/constants/testIDs";
import { elementById, pressBack, delay, elementByLabel } from './lib/utils';


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
      console.debug(Object.keys(process.env).includes('DETOX_START_TIMESTAMP'))
    });

    xit('Initialページが表示される', async () => {
      await expect(elementById(testIDs.INITIAL)).toBeVisible();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON1)).toBeVisible();
    });

    xit('カルーセル2ページ目が表示される', async () => {
      await elementById(testIDs.INITIAL_NEXT_BUTTON1).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON2)).toBeVisible();
    });

    xit('カルーセル3ページ目が表示される', async () => {
      await elementById(testIDs.INITIAL_NEXT_BUTTON2).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BUTTON3)).toBeVisible();
    });

    xit('ChooseLoginページが表示される', async () => {
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

      await elementById(testIDs.SIGN_UP_EMAIL).replaceText(email);
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


  describe('Todo', function() {
    it('todoを追加できる', async () => {
      await expect(elementById(testIDs.TODO_OPEN_INPUT_BUTTON)).toBeVisible();
      await elementById(testIDs.TODO_OPEN_INPUT_BUTTON).tap();

      await expect(elementById(testIDs.TODO_INPUT_TITLE)).toBeVisible();
      await expect(elementById(testIDs.TODO_INPUT_DETAIL)).toBeVisible();
      await elementById(testIDs.TODO_INPUT_TITLE).typeText('タスクのタイトル');
      await elementById(testIDs.TODO_INPUT_DETAIL).typeText('牛乳を買う\n');
      await elementById(testIDs.TODO_INPUT_ADD_BUTTON).tap();
      await expect(elementById(testIDs.HOME)).toBeVisible();
    });

    it('todoを完了できる', async () => {
      await expect(elementByLabel('タスクのタイトル')).toBeVisible();
      await expect(elementByLabel('牛乳を買う')).toBeVisible();

      await expect(elementById(testIDs.TODO_ROW_DONE)).toBeNotVisible();
      await elementByLabel('タスクのタイトル').swipe('right');
      await expect(elementById(testIDs.TODO_ROW_DONE)).toBeVisible();
      await elementById(testIDs.TODO_ROW_DONE).tap();
    });

    it('todoを更新できる', async () => {
      await expect(elementByLabel('牛乳を買う')).toBeVisible();
      await elementByLabel('タスクのタイトル').tap();
      // todoのdetailはelementByLabelでアクセスできない？

      await expect(elementById(testIDs.TODO_DETAIL_SCREEN)).toBeVisible();
      await expect(elementById(testIDs.TODO_DETAIL_INPUT_TITLE)).toBeVisible();
      await expect(elementById(testIDs.TODO_DETAIL_INPUT_DETAIL)).toBeVisible();


      await elementById(testIDs.TODO_DETAIL_INPUT_DETAIL).replaceText('卵を買う\n');
      await elementById(testIDs.TODO_DETAIL_SUBMIT_BUTTON).tap();

      await element(by.id("header-back")).tap(); // react-navigationの戻る
      await expect(elementById(testIDs.HOME)).toBeVisible();
    });

    it('todoを削除できる', async () => {
      await expect(elementByLabel('タスクのタイトル')).toBeVisible();
      // こちらも同様にdetailのlabelにはアクセスできない様子

      await expect(elementById(testIDs.TODO_ROW_DELETE)).toBeNotVisible();
      await elementByLabel('タスクのタイトル').swipe('left');
      await expect(elementById(testIDs.TODO_ROW_DELETE)).toBeVisible();
      await elementById(testIDs.TODO_ROW_DELETE).tap();

      await expect(elementByLabel('タスクのタイトル')).toBeNotVisible();
    });
  });
});
