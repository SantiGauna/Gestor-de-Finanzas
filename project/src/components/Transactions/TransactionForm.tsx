import React, { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const TransactionForm: React.FC = () => {
  const { addTransaction, accounts } = useFinanceStore();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: '',
    accountId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      date: new Date(),
      type: formData.type as 'income' | 'expense',
      accountId: formData.accountId
    };
    
    addTransaction(transaction);
    setFormData({
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      accountId: ''
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Monto"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Categoría"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Seleccionar Tipo</InputLabel>
              <Select
                value={formData.type}
                label="Seleccionar Tipo"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <MenuItem value="expense">Gasto</MenuItem>
                <MenuItem value="income">Ingreso</MenuItem>
              </Select>
            </FormControl>
          </Grid>






          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Seleccionar Cuenta</InputLabel>
              <Select
                value={formData.accountId}
                label="Seleccionar Cuenta"
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                required
              >
                {accounts.map(account => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name} ({account.currency})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              size="large"
            >
              Agregar Transacción
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};