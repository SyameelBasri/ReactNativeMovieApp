import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Context } from '../context/MovieContext';


const Filter = ({type, year, setType, setYear, searchTerm}) => {
	const {state, searchMovies} = useContext(Context);
	const types = ['All', 'movie', 'series', 'episode'];
	const years = Array.from(Array(new Date().getFullYear() - 1969), (_, i) => (i + 1970).toString())
	const yearsReverse = years.concat(['All']).reverse()

	const pickerData = (pickerItems) => {
		return(pickerItems?.length > 0) && (
			pickerItems.map((val, index) => <Picker.Item label={val} value={val} key={index}/>)
		);
	}

	const filterSelected = (value, category) => {
		if(category === 'type' && value !== 'All'){
			searchMovies(searchTerm, 1, value, year);
			setType(value);
		} else if(category === 'type' && value === 'All'){
			searchMovies(searchTerm, 1, '', year);
			setType('');
		} else if(category === 'year' && value !== 'All'){
			searchMovies(searchTerm, 1, type, value);
			setYear(value);
		} else if(category === 'year' && value === 'All'){
			searchMovies(searchTerm, 1, type, '');
			setYear(value);
		}
	}

	return(
		<View style={styles.container}>
			<Text style={{fontSize: 16}}>Filter Type: </Text>
			<Picker
				style={styles.filterDropdown}
				selectedValue={type}
				mode='dropdown'
				onValueChange={(itemValue, itemIndex) =>
					filterSelected(itemValue, 'type')
				}>
					{pickerData(types)}
			</Picker>
			<View style={{height: 40, borderLeftWidth: 0.5, marginRight: 10}}></View>
			<Text style={{fontSize: 16}}>Filter Year: </Text>
			<Picker
				style={styles.filterDropdown}
				selectedValue={year}
				mode='dropdown'
				onValueChange={(itemValue, itemIndex) =>
					filterSelected(itemValue, 'year')
				}>
					{pickerData(yearsReverse)}
			</Picker>
		</View>
		
	);
};

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		alignContent: 'space-around',
		paddingHorizontal: 10,
		borderBottomWidth: 0.5,
	},
	filterDropdown: {
		width:'30%',
	}
});

export default Filter;