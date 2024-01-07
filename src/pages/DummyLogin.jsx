import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/AuthContext';
import convertToCSV from '../download/CSVExport.js'
import toast from 'react-hot-toast';


const DummyLogin = () => {

    const [darkMode, setDarkMode] = useState(false);

    const [btn, setButton] = useState(false);

    const list = useSelector(state => state.expense.expenses);
    const totalAmount = useSelector(state => state.expense.totalAmount);
    const dispatch = useDispatch();

    const priceRef = useRef();
    const desRef = useRef();
    const catRef = useRef();

    const email = localStorage.getItem('email').split('@')[0];

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');

        }
    }, [darkMode]);

    useEffect(() => {
        fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/${email}expenses.json`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let errorMessage = 'Authentication Failed'
                    throw new Error(errorMessage);
                }
            }).then(data => {
                if (data) {
                    dispatch(expenseActions.loadExpenses(Object.values(data)));
                }
            }).catch(err => {
                alert(err);
            })
    }, [dispatch, email])

    const handleDownloadCSV = () => {
        const csvData = convertToCSV(list);

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        const csvUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = csvUrl;
        link.setAttribute('download', 'exported_data.csv');
        document.body.appendChild(link);
        link.click();
        toast.success('File Downloaded')
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        toast.loading('Adding Expense', {
            duration: 1000
        });
        if (desRef.current.value.length < 1 || priceRef.current.value.length < 1) {
            alert('enter valid input');
            return;
        }
        const obj = {
            Description: desRef.current.value,
            Amount: priceRef.current.value,
            Cateogory: catRef.current.value,
        }
        console.log('thisisemail ', email);

        fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/${email}expenses.json`,
            {
                method: 'POST',
                body: JSON.stringify({
                    Description: desRef.current.value,
                    Amount: priceRef.current.value,
                    Cateogory: catRef.current.value,
                }),
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let errorMessage = 'Authentication Failed'
                    throw new Error(errorMessage);
                }
            }).then(data => {
                fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/${email}expenses/${Object.values(data)}.json`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...obj,
                        id: Object.values(data)
                    })
                }).then(res => {
                    if (res.ok) {
                        const obj2 = { ...obj, id: Object.values(data) };
                        dispatch(expenseActions.addExpense(obj2))
                        dispatch(expenseActions.addTotalAmount(obj2))
                        toast.success('Expense Added')
                        return res.json();
                    }
                }).catch(err => {
                    alert(err)
                })
            }).catch(err => alert(err));

        desRef.current.value = '';
        catRef.current.value = '';
        priceRef.current.value = '';
    }

    const handleDelete = (id) => {
        dispatch(expenseActions.deleteExpense(id));
        const url = `https://react-http-96a9c-default-rtdb.firebaseio.com/${email}expenses/${id.id}.json`
        fetch(`${url}`,
            { method: 'DELETE' }
        ).then(res => res.json())
            .catch(err => alert(err))
    }
    const handleEdit = (item) => {
        desRef.current.value = item.Description;
        catRef.current.value = item.Cateogory;
        priceRef.current.value = item.Amount;
        handleDelete(item);
    }

    return (
        <div className='dark:bg-slate-950'>
            <div className='flex justify-between'>
                <form onSubmit={handleFormSubmit} className='flex m-2 p-5'>
                    <div className='mr-2'>
                        <label className=' text-xl dark:text-white' htmlFor="expense">Expenses:</label>
                        <input ref={priceRef} className=' bg-slate-100 rounded-md p-1 ml-2' type="number" />
                    </div>
                    <div className='mr-2'>
                        <label className=' text-xl dark:text-white' htmlFor="description">Description:</label>
                        <input ref={desRef} className=' bg-slate-100 rounded-md p-1 ml-2' type="text" />
                    </div>
                    <div className='mr-2'>
                        <label className=' text-xl dark:text-white' htmlFor="cateogory">Cateogory:</label>
                        <select defaultValue="" ref={catRef} className='ml-2 p-2 rounded-md' name="cateogory" id="cateogory">
                            <option value="" disabled>Chose an option-</option>
                            <option value="Food">Food</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Entertairnment">Entertairnment</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Needs">Needs</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <button type='submit' className=' bg-blue-900 text-white ml-2 p-2 rounded-md'>Add Expense</button>
                </form>
                <div className='p-5'>
                    <span className='p-5 font-semibold dark:text-white'>Total Expense:{totalAmount}</span>
                    {(totalAmount > 1500) && <button onClick={() => { setButton(true) }} className=' bg-purple-900 text-white p-2 rounded-md shadow-2xl'>Activate Premium</button>}
                </div>
            </div>
            <div className='absolute max-w-fit p-10'>
                {list.map((item) => (
                    <div key={item.id} className='grid grid-cols-2'>
                        <div className='col-span-1 p-4'>
                            <ul className='flex gap-3 ml-5 mb-3 dark:text-white'>
                                <span className=' font-semibold'>Description:</span>
                                <li>{item.Description}</li>
                                <span className=' font-semibold'>Price:</span>
                                <li>{item.Amount}</li>
                                <span className=' font-semibold'>Cateogory:</span>
                                <li>{item.Cateogory}</li>
                            </ul>
                        </div>
                        <div className=' col-span-1 p-4'>
                            <button onClick={() => { handleEdit(item) }} className='bg-green-600 ml-6 text-white rounded-md p-1'>Edit Expense</button>
                            <button onClick={() => { handleDelete(item) }} className='bg-red-600 ml-6 text-white rounded-md p-1'>Delete Expense</button>
                        </div>
                    </div>
                ))}
            </div>
            {((totalAmount > 500) && btn) && <button onClick={() => setDarkMode(!darkMode)} className=' absolute bottom-10 right-10 bg-black dark:bg-slate-100 dark:text-black text-white py-2 px-5 rounded-md'>Toggle Mode</button>}
            {btn && <button onClick={handleDownloadCSV} className='dark:bg-white dark:text-black bg-black text-white absolute bottom-10 left-10 py-2 px-8 rounded-md'>Download CSV</button>}
        </div>
    )
}

export default DummyLogin;