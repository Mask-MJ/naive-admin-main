export function getDynamicProps<T extends {}, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
// // 判断两个日期的间隔
// export const dayDiff = (date1: Date, date2: Date) =>
//   Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
// // 字符串的首字母大写
// export const capitalize = (str: string) => str.replace(str[0], str[0].toUpperCase());
// // 字符串的首字母小写
// export const lowerCase = (str: string) => str.replace(str[0], str[0].toLowerCase());
