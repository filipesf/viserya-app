function snakeToCamel(str: string): string {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}

export function convertKeys<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeys(item));
  } else if (obj !== null && obj?.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = snakeToCamel(key);
      acc[camelCaseKey] = convertKeys((obj as any)[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}
