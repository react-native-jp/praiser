import testIDs from "../src/constants/testIDs";
import { elementById } from './lib/utils';

describe('Go to Login', () => {
  describe('Press Button', () => {
    beforeAll(async () => {
      await device.reloadReactNative();
    });
    it('Initialページが表示される', async () => {
      await expect(elementById(testIDs.INITIAL)).toBeVisible();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN1)).toBeVisible();
    });

    it('カルーセル2ページ目に遷移可能', async () => {
      await elementById(testIDs.INITIAL_NEXT_BTN1).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN2)).toBeVisible();
    });

    it('カルーセル3ページ目に遷移可能', async () => {
      await elementById(testIDs.INITIAL_NEXT_BTN2).tap();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN3)).toBeVisible();
    });

    it('Loginページ目に遷移可能', async () => {
      await elementById(testIDs.INITIAL_NEXT_BTN3).tap();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });
  });

  // todo: swipeをどうするか snap carouselで
  xdescribe('Swipe', () => {
    beforeAll(async () => {
      await device.reloadReactNative();
    });

    it('Initialページが表示される', async () => {
      await expect(elementById(testIDs.INITIAL)).toBeVisible();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN1)).toBeVisible();
    });

    it('カルーセル2ページ目に遷移可能', async () => {
      await elementById("swipe").swipe();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN2)).toBeVisible();
    });

    xit('カルーセル3ページ目に遷移可能', async () => {
      await elementById(testIDs.INITIAL_NEXT_BTN2).swipe();
      await expect(elementById(testIDs.INITIAL_NEXT_BTN3)).toBeVisible();
    });

    xit('Loginページ目に遷移可能', async () => {
      await elementById(testIDs.INITIAL_NEXT_BTN3).swipe();
      await expect(elementById(testIDs.CHOOSE_LOGIN)).toBeVisible();
    });
  });
});
