import { CoinData } from '@/types/Crypto';import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import moment from 'moment';
import React, { memo, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
      if (moment(price[0]).add(1, 'day') < moment())
        time = moment(price[0]).format('MMMM DD HH:mm');
      
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
    <Box>
      <ResponsiveContainer width='100%' height={500}>
        <AreaChart data={value.arrayData}>
          <XAxis
            dataKey={'time'}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
            domain={[value.xMin, value.xMax]}
            minTickGap={120}
          />
          <Tooltip labelStyle={{ color: 'black' }} />
          <YAxis
            dataKey='amount'
            tickLine={false}
            axisLine={false}
            tickCount={6}
            type='number'
            domain={['dataMin', 'dataMax']}
            tickFormatter={(tick: number) => {
              if(tick > 1000) return `${(tick / 1000).toFixed(1)}K`;
              return tick;
            }}
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
      <hr />
      <Box margin='20px 0'>
        <b>OHLC Statistics: </b>
      </Box>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <b>Open:</b> {value.arrayData[0]?.amount} USD
          </Grid>
          <Grid item xs={6}>
            <b>High:</b> {value.yMax} USD
          </Grid>
          <Grid item xs={6}>
            <b>Close:</b> {value.arrayData[value.arrayData.length - 1]?.amount}{' '}
            USD
          </Grid>
          <Grid item xs={6}>
            <b>Low:</b> {value.yMin} USD
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(BitcoinGraph);
