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
      return element(by.text('Back')).tap();
    }
  },
};
