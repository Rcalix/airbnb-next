import { NextPage } from "next";
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';

const Header: NextPage = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const selectionRange ={
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges: any) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)

    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image src='https://links.papareact.com/qd3' layout='fill' alt={"aribnb-logo"} objectFit="contain" objectPosition="left"/>
            </div>

            <div className="flex items-center border-2 md:rounded-full py-2 md:shadow-sm">
                <input className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400" onChange={(e) => setInputSearch(e.target.value)} type="text" placeholder="Start your search"></input>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            <div className="flex items-center space-x-4 justify-end text-gray-600">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon  className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
            {inputSearch && <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5861"]} onChange={handleSelect}/>
            </div>}
        </header>
        
    );
}

export default Header;