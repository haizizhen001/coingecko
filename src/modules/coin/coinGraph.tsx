import { CoinData } from '@/types/Crypto';
import moment from 'moment';
import React, { use, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const onGetDataKey = (value: any) => {
  switch (value) {
    case 0:
      return 'month';

    case 1:
      return 'date';

    case 2:
      return 'day';

    case 3:
      return 'time';

    default:
      return 'month';
  }
};

interface IBitcoinGraphProps {
  data: CoinData;
}
interface IGrapData {
  arrayData: {
    time: string;
    amount: number;
  }[];
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}
const BitcoinGraph: React.FC<IBitcoinGraphProps> = ({ data }) => {
  const [value, setValue] = React.useState<IGrapData>({
    arrayData: [],
    xMax: 0,
    xMin: 0,
    yMax: 0,
    yMin: 0,
  });
  const convertData = (data: CoinData) => {
    if (data.prices.length === 0) return;
    let xMax: number = data.prices[0][0],
      xMin: number = data.prices[0][0],
      yMax: number = data.prices[0][1],
      yMin: number = data.prices[0][1];
    const arrayData = data.prices.map((price) => {
      if (price[0] > xMax) xMax = price[0];
      if (price[0] < xMin) xMin = price[0];
      if (price[1] > yMax) yMax = price[1];
      if (price[1] < yMin) yMin = price[1];
      let time = moment(price[0]).format('HH:mm');
      if(moment(price[0]).day() < moment().day()) time = moment(price[0]).format('MMMM DD HH:mm');
      return {
        time: time,
        amount: price[1],
      };
    });
    setValue({ arrayData, xMax, xMin, yMax, yMin });
  };
  useEffect(() => {
    convertData(data);
  }, [data]);
  return (
    <ResponsiveContainer width='100%' height={500}>
      <AreaChart data={value.arrayData}>
        <XAxis
          dataKey={'time'}
          axisLine={false}
          padding={{ left: 20, right: 20 }}
          domain={[value.xMin, value.xMax]}
          minTickGap= {120}
        />
        <Tooltip labelStyle={{ color: 'black' }} />
        <YAxis
          dataKey='amount'
          tickLine={false}
          axisLine={false}
          type='number'
          tickCount={6}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid
          strokeDasharray='2 10'
          stroke='#E53E3E'
          vertical={false}
        />
       
        <Area
          type='monotone'
          dataKey='amount'
          strokeWidth={1}
          stackId='2'
          stroke='#E53E3E'
          fill='url(#color15)'
          fillOpacity={1}
        ></Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BitcoinGraph;
