import { isArray } from 'lodash-es';

interface Time {
  time: string;
  value: number;
}

export const inputDateRange = (date: string[], step = 30): Time[] => {
  let startTime: number,
    endTime: number,
    value = 1;
  const transformDate: Time[] = []; // 储存转换后的数组,时间分段

  if (isArray(date) && date.length === 2) {
    startTime = time2min(date[0]); // 传入的开始时间
    endTime = time2min(date[1]); //传入的结束时间
  } else {
    return [];
  }

  while (startTime < endTime) {
    const right = startTime + step > endTime ? endTime : startTime + step;
    const time = {
      time: `${min2time(startTime)}-${min2time(right)}`,
      value: value,
    };
    transformDate.push(time);
    startTime += step; // 步长递增
    value++;
  }
  return transformDate;
};

// 时间转化为分钟
const time2min = (time: any) => {
  time.indexOf(':') ? (time = time.trim().split(':')) : '';
  return time[0] * 60 + parseInt(time[1]);
};

// 分钟转会字符串时间
const min2time = (minutes: number) => {
  let hour = parseInt(String(minutes / 60));
  const minute = minutes - hour * 60;
  hour >= 24 ? (hour = hour - 24) : '';
  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
};
