const Collection = {
  doc(_: string) {
    return Document;
  },
  get(_: string) {
    return new Promise(resolve => resolve());
  },
};

const Document = {
  collection(_: string) {
    return Collection;
  },
  get<T>(_: string) {
    return new Promise(resolve => resolve({} as T));
  },
  set<T>(_: T) {
    return new Promise(resolve => resolve());
  },
  delete(_: string) {
    return new Promise(resolve => resolve());
  },
  update<T>(_: T) {
    return new Promise(resolve => resolve());
  },
};

export default function createInstance() {
  return {
    collection(_: string) {
      return Collection;
    },
    doc(_: string) {
      return Document;
    },
  };
}
