import EchartsRef from './components/EchartsRef.vue';

export const componentMap = new Map();
componentMap.set('echarts', EchartsRef);

export const data = [
  {
    type: '1',
    title: '进度仪表盘(小)',
    component: 'echarts',
    size: 'small',
    unit: 'km/h',
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 200,
          center: ['50%', '55%'],
          radius: '100%',
          splitNumber: 5,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: { show: true, roundCap: true, width: 10 },
          pointer: { length: '75%', width: 8, offsetCenter: ['0', '5%'] },
          axisLine: { roundCap: true, lineStyle: { width: 8 } },
          axisTick: { distance: 5, splitNumber: 2, lineStyle: { width: 2, color: '#999' } },
          splitLine: { distance: 5, length: 8, lineStyle: { width: 3, color: '#999' } },
          axisLabel: { distance: 12, color: '#999', fontSize: 10 },
          title: { show: false },
          detail: {
            valueAnimation: true,
            fontSize: 16,
            lineHeight: 20,
            color: 'inherit',
            offsetCenter: ['0', '60%'],
            formatter: '{value} km/h \n 进度仪表盘(小)',
          },
          data: [{ value: 100 }],
        },
      ],
    },
  },
  {
    type: '2',
    title: '进度仪表盘(大)',
    component: 'echarts',
    size: 'large',
    unit: 'km/h',
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 200,
          center: ['50%', '65%'],
          radius: '100%',
          splitNumber: 10,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: { show: true, roundCap: true, width: 10 },
          pointer: { length: '75%', width: 8, offsetCenter: ['0', '5%'] },
          axisLine: { roundCap: true, lineStyle: { width: 10 } },
          axisTick: { splitNumber: 2, lineStyle: { width: 2, color: '#999' } },
          splitLine: { length: 12, lineStyle: { width: 3, color: '#999' } },
          axisLabel: { distance: 15, color: '#999', fontSize: 10 },
          title: { show: false },
          detail: {
            valueAnimation: true,
            color: 'inherit',
            formatter: '{value} km/h \n 进度仪表盘(大)',
          },
          data: [{ value: 100 }],
        },
      ],
    },
  },
  {
    type: '3',
    title: '阶段速度仪表盘(小)',
    component: 'echarts',
    size: 'small',
    unit: 'km/h',
    option: {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          min: 0,
          max: 200,
          splitNumber: 10,
          center: ['50%', '50%'],
          radius: '100%',
          pointer: { itemStyle: { color: 'inherit' } },
          axisTick: {
            distance: -20,
            length: 5,
            lineStyle: { color: '#fff', width: 2 },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: { color: '#fff', width: 4 },
          },
          axisLabel: { color: 'inherit', distance: 25, fontSize: 10 },
          detail: {
            formatter: '{value} km/h \n 阶段速度仪表盘(小)',
            color: 'inherit',
            fontSize: 14,
            lineHeight: 14,
            offsetCenter: ['0', '80%'],
          },
          data: [{ value: 70 }],
        },
      ],
    },
  },
  {
    type: '4',
    title: '阶段速度仪表盘(大)',
    component: 'echarts',
    size: 'large',
    unit: 'km/h',
    option: {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          center: ['50%', '60%'],
          radius: '100%',
          pointer: { itemStyle: { color: 'inherit' } },
          axisTick: {
            distance: -20,
            length: 5,
            lineStyle: { color: '#fff', width: 2 },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: { color: '#fff', width: 4 },
          },
          axisLabel: { color: 'inherit', distance: 25, fontSize: 14 },
          detail: {
            formatter: '{value} km/h \n 阶段速度仪表盘(大)',
            color: 'inherit',
            fontSize: 20,
            lineHeight: 20,
            offsetCenter: ['0', '30%'],
          },
          data: [{ value: 70 }],
        },
      ],
    },
  },
  {
    type: '5',
    title: '气温仪表盘(小)',
    component: 'echarts',
    size: 'small',
    unit: '°C',
    option: {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 180,
          radius: '70%',
          splitNumber: 6,
          itemStyle: { color: '#FFAB91' },
          progress: { show: true, width: 20 },
          pointer: { show: false },
          axisLine: { lineStyle: { width: 20 } },
          axisTick: {
            distance: -28,
            splitNumber: 5,
            lineStyle: { width: 2, color: '#999' },
          },
          splitLine: {
            distance: -30,
            length: 6,
            lineStyle: { width: 3, color: '#999' },
          },
          axisLabel: { distance: -5, color: '#999', fontSize: 10 },
          anchor: { show: false },
          title: { show: false },
          detail: {
            valueAnimation: true,
            width: '60%',
            borderRadius: 8,
            offsetCenter: ['0', '40%'],
            fontSize: 16,
            lineHeight: 20,
            fontWeight: 'bolder',
            formatter: '{value} °C \n 气温仪表盘(小)',
            color: 'inherit',
          },
          data: [{ value: 20 }],
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 180,
          radius: '70%',
          itemStyle: { color: '#FD7347' },
          progress: { show: true, width: 8 },
          pointer: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: 20 }],
        },
      ],
    },
  },
  {
    type: '6',
    title: '气温仪表盘(大)',
    component: 'echarts',
    size: 'large',
    unit: '°C',
    option: {
      series: [
        {
          type: 'gauge',
          center: ['50%', '70%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 180,
          radius: '85%',
          splitNumber: 12,
          itemStyle: { color: '#FFAB91' },
          progress: { show: true, width: 20 },
          pointer: { show: false },
          axisLine: { lineStyle: { width: 20 } },
          axisTick: {
            distance: -30,
            splitNumber: 5,
            lineStyle: { width: 2, color: '#999' },
          },
          splitLine: {
            distance: -32,
            length: 8,
            lineStyle: { width: 3, color: '#999' },
          },
          axisLabel: { distance: -10, color: '#999', fontSize: 12 },
          anchor: { show: false },
          title: { show: false },
          detail: {
            valueAnimation: true,
            width: '60%',
            borderRadius: 8,
            offsetCenter: ['0', '0'],
            fontSize: 20,
            lineHeight: 20,
            fontWeight: 'bolder',
            formatter: '{value} °C \n 气温仪表盘(大)',
            color: 'inherit',
          },
          data: [{ value: 20 }],
        },
        {
          type: 'gauge',
          center: ['50%', '70%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 180,
          radius: '85%',
          itemStyle: { color: '#FD7347' },
          progress: { show: true, width: 8 },
          pointer: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: 20 }],
        },
      ],
    },
  },
];