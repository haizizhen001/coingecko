import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, Tab, Tabs } from '@mui/material';
import CoinSelector from './coinSelect';
import CoinChart from './coinChart';

const Bitcoin = () => {
  const [coinSelect, setCoinSelect] = useState('bitcoin');
 
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'inline-block',
            width: '100%',
          }}
        >
          <CoinSelector
            coinId={coinSelect}
            setCoinSelect={setCoinSelect}
          />
        </Box>
        <CoinChart coinId={coinSelect} />
      </CardContent>
    </Card>
  );
};

export default Bitcoin;
