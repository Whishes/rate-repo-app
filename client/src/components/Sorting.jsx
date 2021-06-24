import React from 'react'
import {Picker} from '@react-native-picker/picker';

const Sorting = ({sorting, setSortingCriteria}) => {
    return (
        <Picker onValueChange={(value) => setSortingCriteria(value)} selectedValue={sorting}>
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest_rated" />
            <Picker.Item label="Lowest rated repositories" value="lowest_rated" />
        </Picker>
    )
}

export default Sorting
