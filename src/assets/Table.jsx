import React, { useEffect, useState, useRef } from 'react';
import List from './List';

function Table() {
    const [allCities, setAllCities] = useState([]); // State to hold all cities
    const [cities, setCities] = useState([]); // State to hold filtered cities
    const [search, setSearch] = useState(''); // State to hold search term
    const [btnSearch, setBtnSearch] = useState(''); // State to hold value of input field
    const [loading, setLoading] = useState(false); // State to indicate loading state
    const [showSuggestions, setShowSuggestions] = useState(false); // State to control visibility of suggestions
    const containerRef = useRef(null); // Ref for the scroll container
    const [suggestions,setSuggestions]=useState([])

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []); // Removed `containerRef.current` from dependencies to avoid unnecessary re-renders

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`);
        const data = await response.json();
        const newCities = data.results;
        setCities(newCities)
        setAllCities(prevCities => [...prevCities, ...newCities]); // Appending all cities to the state
        setLoading(false);
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setBtnSearch(inputValue);



        // Update search term state
        setSearch(inputValue);

        // Show suggestions only if input is not empty
        setShowSuggestions(inputValue.trim() !== '');

        const filteredCities1 = allCities.filter(city => city.ascii_name.toLowerCase().startsWith(inputValue.toLowerCase()));
        setSuggestions(filteredCities1.slice(0, 14))
    }

    const handleSearch = () => {
        // Perform search action here if needed
        const filteredCities = allCities.filter(city => city.ascii_name.toLowerCase().startsWith(btnSearch.toLowerCase()));
        setCities(filteredCities);
    }

    const handleScroll = () => {
        if (
            containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight &&
            !loading
        ) {
        }
    }

    

    const sugClick=(value)=>{
        setBtnSearch(value)
        handleSearch()
        setSuggestions([])
    }

    return (
        <>
            <div className='bg-zinc-900 w-full text-white flex justify-center items-center min-h-screen'>
                <div>
                    <input placeholder='Enter City Name...' value={btnSearch} className='w-96 h-12 p-6 rounded-lg outline mb-12 text-black ml-36' onChange={handleInputChange} />
                    <button className='bg-red-800 font-black w-24 ml-6 h-12 rounded-lg text-white' onClick={handleSearch}>Search</button>

                    {/* Display suggestions if search input is not empty */}
                    {showSuggestions && (
                        
                        <div className="absolute bg-white w-96 mt-1 shadow-lg rounded-lg">
                            {suggestions.map((city, index) => (
                                <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black" onClick={() => sugClick(city.ascii_name)}>
                                    {city.ascii_name}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-200" style={{ maxHeight: 'calc(100vh - 200px)' }} ref={containerRef}>
                        <table className="table-auto">
                            <thead>
                                <tr className='text-red-600'>
                                    <th className="px-4 py-2">City Name</th>
                                    <th className="px-4 py-2">Country</th>
                                    <th className="px-4 py-2">Population</th>
                                    <th className="px-4 py-2">Time Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((city, index) => (
                                    <List key={index} cc={city.cou_name_en} name={city.ascii_name} population={city.population} timeZone={city.timezone} />
                                ))}
                                {loading && <tr><td colSpan="4">Loading...</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
