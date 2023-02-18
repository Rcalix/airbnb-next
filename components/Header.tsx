import { NextPage } from "next";
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";

type IHeader = {
    placeholder: string
}
const Header: NextPage<IHeader> = ({placeholder}) => {
    const [inputSearch, setInputSearch] = useState('');
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [numberOfGuess, setNumberOfGuess] = useState(1);
    const router = useRouter();

    const selectionRange ={
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges: any) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setNumberOfGuess(0);
        setInputSearch('');
    }

    const searchFunction = () => {
        router.push({
            pathname: '/search',
            query:{
                location: inputSearch,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuess
            }
        })
    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
            <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image src='https://links.papareact.com/qd3' layout='fill' alt={"aribnb-logo"} objectFit="contain" objectPosition="left"/>
            </div>

            <div className="flex items-center border-2 md:rounded-full py-2 md:shadow-sm">
                <input className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} type="text" placeholder={placeholder ||  "Start your search"} />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            <div className="flex items-center space-x-4 justify-end text-gray-600">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon  className="h-6"/>
                    <UserCircleIcon className="h-5"/>
                </div>
            </div>
            {inputSearch && <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5861"]} onChange={handleSelect}/>
                <div className="flex items-center border-b mb-4">
                    <h1 className="text-2xl flex-grow font font-semibold">Number of guess</h1>
                    <UserIcon className="h-5"/>
                    <input value={numberOfGuess} min={1} type="number" className="w-12 pl-2 text-lg outline-none text-red-400" onChange={(e) => setNumberOfGuess(parseInt(e.target.value))}/>
                </div>
                <div className="flex ">
                    <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
                    <button className="flex-grow text-red-400" onClick={searchFunction}>Search</button>
                </div>
            </div>}
          
        </header>
        
    );
}

export default Header;

