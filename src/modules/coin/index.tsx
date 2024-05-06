import React, { use, useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, Tab, Tabs } from '@mui/material';
import CoinSelector from './coinSelect';
import CoinChart from './coinChart';
import { NotificationProvider } from '@/function/useNotication';
const Bitcoin = () => {

  const [coinSelect, setCoinSelect] = useState('bitcoin');
  return (
    <NotificationProvider>
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
    </NotificationProvider>
  );
};

export default Bitcoin;
