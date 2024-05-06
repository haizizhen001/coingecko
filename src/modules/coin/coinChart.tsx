import { memo, useEffect, useState } from 'react';import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import moment from 'moment';
import { useCoingecko } from '@/function/useCoingecko';
import { CoinData } from '@/types/Crypto';
import BitcoinGraph from './coinGraph';

interface ICoinChartProps {
  coinId: string;
}

const CoinChart: React.FC<ICoinChartProps> = ({ coinId }) => {
  const { getPriceRange } = useCoingecko();
  const [coinData, setCoinData] = useState<CoinData>({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });
  const fetchGetPriceRange = async () => {
    try {
      const response = await getPriceRange(
        coinId,
        moment().subtract(2, 'day').unix(),
        moment().unix()
      );
      if (response.prices.length > 0) {
        setCoinData(response);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchGetPriceRange();
  }, [coinId]);
  const handleChange = (event: React.SyntheticEvent, value: number) => {
    console.log(value);
  };
  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
        }}
      >
        <Box
          sx={{
            ml: { md: 'auto' },
          }}
        >
          <Tabs
            sx={{
              position: 'relative',
              '& .muiTab': {
                fontSize: 14,
                textTransform: 'capitalize',
                padding: 0,
                mx: { xs: 1, sm: 2, xl: 5 },
                minWidth: 10,
              },
            }}
            value={0}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab className='muiTab' label={'Yearly'} />
            <Tab className='muiTab' label={'Monthly'} />
            <Tab className='muiTab' label={'Weekly'} />
            <Tab className='muiTab' label={'Daily'} />
          </Tabs>
        </Box>
      </Box>
      <Box>
        <BitcoinGraph data={coinData} />
      </Box>
    </Box>
  );
};
export default memo(CoinChart);
