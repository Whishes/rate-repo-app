import React, { useEffect, useState } from 'react'
import TextInput from "./TextInput";

const FilterBar = ({ filter, setFilter }) => {
    const [input, setInput] = useState(filter);

    useEffect(() => {
        const delay = setTimeout(() => {
            setFilter(input)
        }, 500);
        return () => clearInterval(delay);
    }, [input]);

    return (
        <TextInput value={input} onChangeText={setInput} placeholder="Filter..." />
    );
};

export default FilterBar
