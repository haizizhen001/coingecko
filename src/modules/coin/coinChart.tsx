import { memo, use, useEffect, useState } from 'react';import Box from '@mui/material/Box';
import { Tab, Tabs, TextField, Grid } from '@mui/material';
import moment from 'moment';
import { useCoingecko } from '@/function/useCoingecko';
import { CoinData } from '@/types/Crypto';
import BitcoinGraph from './coinGraph';
import { useNotification } from '@/function/useNotication';

interface ICoinChartProps {
  coinId: string;
}

const CoinChart: React.FC<ICoinChartProps> = ({ coinId }) => {
  const { getPriceRange } = useCoingecko();
  const { showMessage } = useNotification();
  const [value, setValue] = useState<string>('1D');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [coinData, setCoinData] = useState<CoinData>({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });
  const fetchGetPriceRange = async (from?: number, to?: number) => {
    try {
      const dateFrom = from ? from : moment().subtract(1, 'day').unix();
      const dateTo = to ? to : moment().unix();
      const response = await getPriceRange(coinId, dateFrom, dateTo);
      if (response.prices.length > 0) {
        setCoinData(response);
      } else {
        showMessage('No data found');
      }
    } catch (error: any) {
      showMessage(error.message + ' Many too request, please try again later!');
    }
  };

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    switch (value) {
      case '1D':
        fetchGetPriceRange();
        setValue(value);
        break;
      case '7D':
        fetchGetPriceRange(moment().subtract(7, 'day').unix(), moment().unix());
        setValue(value);
        break;
      case '1M':
        fetchGetPriceRange(
          moment().subtract(1, 'month').unix(),
          moment().unix()
        );
        setValue(value);
        break;
      case '3M':
        fetchGetPriceRange(
          moment().subtract(3, 'month').unix(),
          moment().unix()
        );
        setValue(value);
        break;
      case '1Y':
        fetchGetPriceRange(
          moment().subtract(1, 'year').unix(),
          moment().unix()
        );
        setValue(value);
        break;
    }
    if (value) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleStartDateChange = (date : any) => {
    setStartDate(date);
    setValue('')
  };

  const handleEndDateChange = (date : any) => {
    setEndDate(date);
    setValue('')
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchGetPriceRange(
        moment(startDate).unix(),
        moment(endDate).unix()
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchGetPriceRange(0, 0);
  }, [coinId]);
  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
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
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='24H' value='1D' />
            <Tab label='7D' value='7D' />
            <Tab label='1M' value='1M' />
            <Tab label='3M' value='3M' />
            <Tab label='1Y' value='1Y' />
          </Tabs>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label='Start Date'
                type='date'
                value={startDate}
                onChange={(e :any) => handleStartDateChange(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label='End Date'
                type='date'
                value={endDate}
                onChange={(e : any) => handleEndDateChange(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        {coinData.prices.length > 0 && <BitcoinGraph data={coinData} />}
      </Box>
    </Box>
  );
};
export default memo(CoinChart);
