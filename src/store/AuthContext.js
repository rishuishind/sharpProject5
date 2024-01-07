import { configureStore, createSlice } from "@reduxjs/toolkit";


const loginInitialState = { isLogin: true, token: '' };

const loginSlice = createSlice({
    name: 'login',
    initialState: loginInitialState,
    reducers: {
        changeLogin: (state) => {
            state.isLogin = !state.isLogin;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

const expenseInitialState = { expenses: [], totalAmount: 0 }

const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseInitialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses = [...state.expenses, action.payload];
        },
        loadExpenses: (state, action) => {
            state.expenses = action.payload;
            state.totalAmount = action.payload.reduce((sum, expense) => sum + (+expense.Amount), 0);
        },
        addTotalAmount: (state, action) => {
            const amt = state.totalAmount + (+action.payload.Amount);
            state.totalAmount = +amt;
        },
        deleteExpense: (state, action) => {
            const idToDelete = action.payload.id[0];
            state.totalAmount -= action.payload.Amount;
            state.expenses = state.expenses.filter((item) => item.id[0] !== idToDelete);
        }
    }
})


const store = configureStore({
    reducer: { login: loginSlice.reducer, expense: expenseSlice.reducer, }
});

export const loginActions = loginSlice.actions;
export const expenseActions = expenseSlice.actions;
export default store;