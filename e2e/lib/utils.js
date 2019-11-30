module.exports = {
  elementByLabel: (label) => {
    return element(by.text(label));
  },
  elementById: (id) => {
    return element(by.id(id));
  },
  pressBack: () => {
    if (device.getPlatform() === 'android') {
      return device.pressBack();
    } else {
      // react-navigationの戻るボタン
      return element(by.id("header-back")).tap();
    }
  },
  delay: (ms: number): Promise<void> => new Promise((res: any) => setTimeout(res, ms)),
};
