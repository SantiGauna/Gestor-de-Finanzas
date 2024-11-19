import React, { useEffect, useState } from 'react';
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
  createTheme,
  Modal,
  Button,
  IconButton
} from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';

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
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openTransactionsModal, setOpenTransactionsModal] = useState(false);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleOpenTransactionModal = () => setOpenTransactionModal(true);
  const handleCloseTransactionModal = () => setOpenTransactionModal(false);

  const handleOpenTransactionsModal = () => setOpenTransactionsModal(true);
  const handleCloseTransactionsModal = () => setOpenTransactionsModal(false);

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
              <IconButton color="inherit" onClick={handleOpenTransactionsModal}>
                <AccountBalanceWallet />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Container fixed sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {accounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <AccountSummary account={account} />
                </Grid>
              ))}
            </Grid>

            {/* Botón para abrir el modal de nueva transacción */}
            <Box sx={{ mt: 4 , display: 'flex', justifyContent: 'center'}}>
              <Button variant="contained" color="primary" onClick={handleOpenTransactionModal}>
                Nueva Transacción
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Modal de Nueva Transacción */}
        <Modal
          open={openTransactionModal}
          onClose={handleCloseTransactionModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            flexGrow: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            width: '1000px',
            boxShadow: 24,
            borderRadius: 1
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Nueva Transacción
            </Typography>
            <TransactionForm />
          </Box>
        </Modal>

        {/* Modal de Últimas Transacciones */}
        <Modal
          open={openTransactionsModal}
          onClose={handleCloseTransactionsModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            width: '1000px',
            maxHeight: '80%',
            overflowY: 'auto',
            boxShadow: 24,
            borderRadius: 1
          }}>
            <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
              Últimas Transacciones
            </Typography>
            <TransactionList transactions={transactions} />
          </Box>
        </Modal>
      </Router>
    </ThemeProvider>
  );
}

export default App;
