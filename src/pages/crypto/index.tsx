import Coin from '@/modules/coin';import React from 'react';
import { NotificationProvider } from '@/function/useNotication';

const Crypto = () => (
  <NotificationProvider>
    <Coin />
  </NotificationProvider>
);

export default Crypto;
