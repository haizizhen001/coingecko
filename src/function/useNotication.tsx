import React, { createContext, useState, useContext } from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

// Create the context
const NotificationContext = createContext({
  showMessage: (message: string) => {},
  hideMessage: () => {},
});

// Create the provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const hideMessage = () => {
    setOpen(false);
  };

return (
    <NotificationContext.Provider value={{ showMessage, hideMessage }}>
        <div>{children}</div>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={hideMessage}
            message= {message}
            autoHideDuration={1000}
        />
    </NotificationContext.Provider>
);
};

// Create a hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};
