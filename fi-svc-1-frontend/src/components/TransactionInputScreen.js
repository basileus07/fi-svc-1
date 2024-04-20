import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import '../App.css'
import axios from 'axios'


const TransactionInputScreen = () => {
    const [formData, setFormData] = useState({
        date: '',
        amount: 0.0,
        category: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'amount' ? parseFloat(value) : value; // Parse amount to float
        setFormData({ ...formData, [name]: parsedValue });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            date: formData.date,
            amount: parseFloat(formData.amount), // Parse amount to float if necessary
            category: formData.category,
            description: formData.description
        }

        console.log("data: ", data)

        try {
            const response = await axios.post('http://127.0.0.1:5000/transactions', data);
            console.log("response after transcation submission: ", response);
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }

        //Reset form Data
        setFormData({
            date: '',
            amount: '',
            category: '',
            description: '',
        });
    };


    return (
        <div className="transaction-form-container">
            <Typography variant="h5" className="form-heading">
                Enter Transaction Details
            </Typography>
            <form className="transaction-form" onSubmit={handleSubmit}>
                <TextField
                    // label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <FormControl className="form-control">
                    <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Groceries">Groceries</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Transportation">Transportation</MenuItem>
                        <MenuItem value="Rent">Health</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        {/* Add more categories as needed */}
                    </Select>
                </FormControl>
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-button"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default TransactionInputScreen;
