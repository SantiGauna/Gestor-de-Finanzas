import React from 'react';
import { Account } from '../../types/finance';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface AccountSummaryProps {
  account: Account;
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({ account }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <AccountBalanceWalletIcon color="primary" />
          <Typography variant="h6" component="h3">
            {account.name}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" fontWeight="bold" color="primary">
          {account.currency === 'ARS' ? '$' : 'US$'}
          {account.balance.toLocaleString()}
          <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {account.currency}
          </Typography>
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, textTransform: 'capitalize' }}>
          {account.type}
        </Typography>
      </CardContent>
    </Card>
  );
};