import React from 'react';
import { Transaction } from '../../types/finance';
import { useFinanceStore } from '../../store/useFinanceStore';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Box,
  Paper,
  Chip
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const accounts = useFinanceStore(state => state.accounts);

  const getAccountCurrency = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.currency || 'ARS';
  };

  return (
    <List component={Paper} sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {transactions.map((transaction) => {
        const currency = getAccountCurrency(transaction.accountId);
        const account = accounts.find(acc => acc.id === transaction.accountId);
        const isIncome = transaction.type === 'income';

        return (
          <ListItem
            key={transaction.id}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" component="span">
                    {transaction.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color={isIncome ? 'success.main' : 'error.main'}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    {isIncome ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    {currency === 'ARS' ? '$' : 'US$'}
                    {Math.abs(transaction.amount).toLocaleString()}
                  </Typography>
                </Box>
              }
              secondary={
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Box>
                    <Chip
                      label={transaction.category}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" component="span" color="text.secondary">
                      {account?.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(transaction.date).toLocaleDateString()}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};