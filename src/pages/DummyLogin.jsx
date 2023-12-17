import React, { useRef, useState } from 'react'
const DummyLogin = () => {

    const [list, setList] = useState([]);


    const priceRef = useRef();
    const desRef = useRef();
    const catRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const obj = {
            Description: desRef.current.value,
            Amount: priceRef.current.value,
            Cateogory: catRef.current.value
        }
        setList((prev) => {
            return ([...prev, obj])
        })
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
                    <ul className='flex gap-3 ml-5 mb-3'>
                        <span className=' font-semibold'>Description:</span>
                        <li key={item.Description}>{item.Description}</li>
                        <span className=' font-semibold'>Price:</span>
                        <li key={item.Description}>{item.Amount}</li>
                        <span className=' font-semibold'>Cateogory:</span>
                        <li key={item.Description}>{item.Cateogory}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default DummyLogin;