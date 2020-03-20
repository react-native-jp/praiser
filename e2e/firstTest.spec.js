import testIDs from "../src/constants/testIDs";
import { elementById, pressBack, elementByLabel } from './lib/utils';

describe('All', () => {
  afterAll(async () => {
    await device.resetContentAndSettings().then(() => console.info(' Reset iOS All Settings 🧹'));
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

    it('カルーセルの表示は一度きり', async () => {
      await device.launchApp({newInstance: true});

      await expect(elementById(testIDs.INITIAL)).toBeNotVisible();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });
  });

  describe('Go to Home', function() {
    let email;
    let password;

    beforeAll(() => {
      const random = new Date().getTime();
      email = `e2e+from_detox_${random}@gmail.com`;
      password = 'password';
    });

    it('SignUpページが表示される', async () => {
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
      await elementById(testIDs.SIGN_UP_BUTTON).tap();
      await expect(elementById(testIDs.SIGN_UP)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_UP_PASSWORD)).toBeVisible();
    });

    it('SignInページが表示される', async () => {
      await pressBack();
      await elementById(testIDs.SIGN_IN_BUTTON).tap();
      await expect(elementById(testIDs.SIGN_IN)).toBeVisible();
      await expect(elementById(testIDs.SIGN_IN_EMAIL)).toBeVisible();
      await expect(elementById(testIDs.SIGN_IN_PASSWORD)).toBeVisible();
    });

    it('アカウントを登録できる', async () => {
      await pressBack();
      await elementById(testIDs.SIGN_UP_BUTTON).tap();

      await elementById(testIDs.SIGN_UP_EMAIL).typeText(email);
      await elementById(testIDs.SIGN_UP_PASSWORD).typeText(password);
      await elementById(testIDs.SIGN_UP_REGISTER_BUTTON).tap();

      await waitFor(elementById(testIDs.HOME)).toBeVisible().withTimeout(10000);
      await expect(elementById(testIDs.HOME)).toBeVisible();
    });


    it('サインアウトできる', async () => {
      await elementById(testIDs.MENU_HEADER_LEFT_BUTTON).tap();
      await elementByLabel('USER_INFO').tap();
      await expect(elementById(testIDs.USER_INFO_SCREEN)).toBeVisible();

      await elementById(testIDs.USER_INFO_SIGN_OUT_BUTTON).tap();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });

    it('サインインできる', async () => {
      await elementById(testIDs.SIGN_IN_BUTTON).tap();

      await expect(elementById(testIDs.SIGN_IN)).toBeVisible();
      await elementById(testIDs.SIGN_IN_EMAIL).typeText(email);
      await elementById(testIDs.SIGN_IN_PASSWORD).typeText(password);
      await elementById(testIDs.SIGN_IN_EMAIL_BUTTON).tap();

      await waitFor(elementById(testIDs.HOME)).toBeVisible().withTimeout(10000);
      await expect(elementById(testIDs.HOME)).toBeVisible();
    });
  });


  describe('Todo', function() {
    it('todoを追加できる', async () => {
      await expect(elementById(testIDs.TODO_OPEN_INPUT_BUTTON)).toBeVisible();
      await elementById(testIDs.TODO_OPEN_INPUT_BUTTON).tap();

      if (device.getPlatform() === 'android') {
        await elementById(testIDs.TODO_INPUT_TITLE).replaceText('買い物');
        await elementById(testIDs.TODO_INPUT_DETAIL).replaceText('牛乳を買う');
      } else {
        await elementById(testIDs.TODO_INPUT_TITLE).typeText('買い物');
        await elementById(testIDs.TODO_INPUT_DETAIL).typeText('牛乳を買う\n');
      }
      await elementById(testIDs.TODO_INPUT_ADD_BUTTON).tap();

      await expect(elementById(testIDs.HOME)).toBeVisible();
      await expect(elementByLabel('買い物')).toBeVisible();
      await expect(elementByLabel('牛乳を買う')).toBeVisible();
    });

    it('todoを完了できる', async () => {
      if (device.getPlatform() === 'ios') {
        await expect(elementById(testIDs.TODO_ROW_DONE)).toBeNotVisible();
      }
      await elementByLabel('買い物').swipe('right');
      await expect(elementById(testIDs.TODO_ROW_DONE)).toBeVisible();
      await elementById(testIDs.TODO_ROW_DONE).tap();

      // 未完了にするボタンが表示されていることの確認
      await elementByLabel('買い物').swipe('right');
      await expect(elementById(testIDs.TODO_ROW_NOT_DONE)).toBeVisible();
    });

    it('todoを更新できる', async () => {
      await elementByLabel('買い物').tap();

      await expect(elementById(testIDs.TODO_DETAIL_SCREEN)).toBeVisible();
      await expect(elementById(testIDs.TODO_DETAIL_INPUT_TITLE)).toBeVisible();
      await expect(elementById(testIDs.TODO_DETAIL_INPUT_DETAIL)).toBeVisible();

      await elementById(testIDs.TODO_DETAIL_INPUT_TITLE).replaceText('連絡');
      await elementById(testIDs.TODO_DETAIL_INPUT_DETAIL).replaceText('太郎にメール');
      await elementById(testIDs.TODO_DETAIL_SUBMIT_BUTTON).tap();

      await pressBack();
      await expect(elementById(testIDs.HOME)).toBeVisible();
      await expect(elementByLabel('連絡')).toBeVisible();
      await expect(elementByLabel('太郎にメール')).toBeVisible();
    });

    it('todoを削除できる', async () => {
      if (device.getPlatform() === 'ios') {
        await expect(elementById(testIDs.TODO_ROW_DELETE)).toBeNotVisible();
      }
      await elementByLabel('連絡').swipe('left');
      await expect(elementById(testIDs.TODO_ROW_DELETE)).toBeVisible();
      await elementById(testIDs.TODO_ROW_DELETE).tap();

      await expect(elementByLabel('連絡')).toBeNotVisible();
    });
  });
});
