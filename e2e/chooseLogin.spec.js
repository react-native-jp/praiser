import testIDs from "../src/constants/testIDs";
import { elementById } from './lib/utils';

describe('Go to ChooseLogin', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });
  it('Initialページが表示される', async () => {
    await expect(elementById(testIDs.INITIAL)).toBeVisible();
    await expect(elementById(testIDs.INITIAL_NEXT_BTN1)).toBeVisible();
  });

  it('カルーセル2ページ目が表示される', async () => {
    await elementById(testIDs.INITIAL_NEXT_BTN1).tap();
    await expect(elementById(testIDs.INITIAL_NEXT_BTN2)).toBeVisible();
  });

  it('カルーセル3ページ目が表示される', async () => {
    await elementById(testIDs.INITIAL_NEXT_BTN2).tap();
    await expect(elementById(testIDs.INITIAL_NEXT_BTN3)).toBeVisible();
  });

  it('ChooseLoginページが表示される', async () => {
    await elementById(testIDs.INITIAL_NEXT_BTN3).tap();
    await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
  });
});
