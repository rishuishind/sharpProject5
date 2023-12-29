import React, { useEffect, useRef, useState } from 'react'
const DummyLogin = () => {

    const [list, setList] = useState([]);

    const priceRef = useRef();
    const desRef = useRef();
    const catRef = useRef();

    useEffect(() => {
        fetch('https://react-http-96a9c-default-rtdb.firebaseio.com/expenses.json')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let errorMessage = 'Authentication Failed'
                    throw new Error(errorMessage);
                }
            }).then(data => {
                if (data) {
                    setList(Object.values(data));
                }
            }).catch(err => {
                alert(err);
            })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (desRef.current.value.length < 1 || priceRef.current.value.length < 1) {
            alert('enter valid input');
            return;
        }
        const obj = {
            Description: desRef.current.value,
            Amount: priceRef.current.value,
            Cateogory: catRef.current.value,
        }

        fetch('https://react-http-96a9c-default-rtdb.firebaseio.com/expenses.json',
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
                fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/expenses/${Object.values(data)}.json`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...obj,
                        id: Object.values(data)
                    })
                }).then(res => {
                    if (res.ok) {
                        const obj2 = { ...obj, id: Object.values(data) };
                        setList((prev) => {
                            return ([...prev, obj2])
                        })
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
        const newList = list.filter((item) => item.id !== id.id)
        console.log(newList);
        setList(newList);
        const url = `https://react-http-96a9c-default-rtdb.firebaseio.com/expenses/${id.id}.json`
        fetch(`${url}`,
            { method: 'DELETE' }
        ).then(res => res.json())
            .catch(err => alert(err))
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className='flex m-2 p-5'>
                <div className='mr-2'>
                    <label className=' text-xl' htmlFor="expense">Expenses:</label>
                    <input ref={priceRef} className=' bg-slate-100 rounded-md p-1 ml-2' type="number" />
                </div>
                <div className='mr-2'>
                    <label className=' text-xl' htmlFor="description">Description:</label>
                    <input ref={desRef} className=' bg-slate-100 rounded-md p-1 ml-2' type="text" />
                </div>
                <div className='mr-2'>
                    <label className=' text-xl' htmlFor="cateogory">Cateogory:</label>
                    <select ref={catRef} className='ml-2 p-2 rounded-md' name="cateogory" id="cateogory">
                        <option value="" selected defaultValue={'Others'} disabled>Chose an option-</option>
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
            <div className='absolute max-w-fit p-10'>
                {list.map((item) => (
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1 p-4'>
                            <ul key={item.Description} className='flex gap-3 ml-5 mb-3'>
                                <span className=' font-semibold'>Description:</span>
                                <li>{item.Description}</li>
                                <span className=' font-semibold'>Price:</span>
                                <li>{item.Amount}</li>
                                <span className=' font-semibold'>Cateogory:</span>
                                <li>{item.Cateogory}</li>
                            </ul>
                        </div>
                        <div className=' col-span-1 p-4'>
                            <button onClick={() => { handleDelete(item) }} className='bg-red-600 ml-6 text-white rounded-md p-1'>delete expense</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DummyLogin;