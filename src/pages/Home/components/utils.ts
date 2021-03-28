export function getHashValues(hash: string) {
  return Object.values(hash); // needs modern browser
}

export function hashById(array: any[]) {
  const hash = {};

  for (const item of array) {
    hash[item.id] = item;
  }

  return hash;
}

export function excludeById(array: any[], id: number) {
  return array.filter((item) => item.id !== id);
}

export function getTodayStr() {
  return new Date().toISOString().replace(/T.*$/, "");
}

export const reportNetworkError = () => {
  alert("发生错误，操作失败");
};
