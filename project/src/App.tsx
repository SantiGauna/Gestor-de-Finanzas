import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AccountSummary } from './components/Dashboard/AccountSummary';
import { TransactionList } from './components/Transactions/TransactionList';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { useFinanceStore } from './store/useFinanceStore';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  Grid,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const { accounts, transactions, initializeData } = useFinanceStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                Gestión de Finanzas
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {accounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <AccountSummary account={account} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Nueva Transacción
              </Typography>
              <TransactionForm />
              
              <Typography variant="h5" component="h2" gutterBottom>
                Últimas Transacciones
              </Typography>
              <TransactionList transactions={transactions} />
            </Box>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;