import React, { memo, useEffect, useState } from 'react';import Box from '@mui/material/Box';
import { Autocomplete, Snackbar, TextField } from '@mui/material';
import { useCoingecko } from '@/function/useCoingecko';
import { CoinType } from '@/types/Crypto';

interface ICountrySelectProps {
  coinId: string;
  setCoinSelect: any;
}
const CoinSelector = ({ coinId, setCoinSelect }: ICountrySelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const { getCoinList, getCoinTrend } = useCoingecko();
  const [coinData, setCoinData] = useState<CoinType[]>([]);
  const [coinTrend, selectCoinTrend] = useState<CoinType[]>([]);
  const fetchDataCoinList = async () => {
    try {
      const response = await getCoinList();
      if (response.length > 0) setCoinData(response);
      else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const fetchDataCoinTrend = async () => {
    try {
      const response = await getCoinTrend();
      if (response.length > 0) selectCoinTrend(response);
      else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDataCoinTrend();
    fetchDataCoinList();
  }, []);

  return (
    <Autocomplete
      loading={coinTrend.length === 0}
      id='coin-select'
      value={coinData.find((coin) => coin.id === coinId) || null}
      sx={{ minWidth: 400 }}
      options={
        inputValue
          ? coinData.filter(
              (coin) =>
                coin.name.includes(inputValue) ||
                coin.symbol.includes(inputValue)
            )
          : coinTrend
      }
      autoHighlight
      getOptionLabel={(option) => option.name || option.symbol}
      onChange={(event, value) => {
        setCoinSelect(value);
      }}
      onInputChange={(event, value) => {
        setInputValue(value ? value : '');
      }}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          [{option.symbol.toUpperCase()}] {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose a coin'
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};
export default memo(CoinSelector);
