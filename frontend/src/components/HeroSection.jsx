import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const [Query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(Query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <h1 className='text-5xl font-bold'>Explore, Apply <span className='text-[#f0d214]'>&</span><br />Secure Your <span className='text-[#c31664]'>Ideal Job</span></h1>
                <p>JobHunt: Helping You Find Your Next Career Move with Ease and Confidence.</p>
                <div className='flex w-[40%] shadow-[0px_0px_2px_2px_rgba(219,112,147,112)] border border-pink pl-3 rounded-full items-center gap-4  mx-auto'>
                    <input type="text"
                        placeholder='Explore Jobs'
                        className='outline-none border-none w-full'
                        onChange={(e)=>setQuery(e.target.value)}
                    />

                    <Button onClick={searchJobHandler} className=' rounded-r-full transition duration-75 active:scale-90'>
                        <Search  className='h-5 w-5'> </Search>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;