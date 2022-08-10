import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';

const NoteForm = ({onSubmit, initialNote}) => {
	const [note, setTitle] = useState(initialNote);

	return(
		<View style={{flex: 1, paddingVertical: 10}}>
			<Text style={styles.label}>Write something about the movie:</Text>
			<TextInput value={note} onChangeText={(text) => setTitle(text)} style={styles.input} accessibilityHint={'Good movie :)'}/>
			<TouchableOpacity onPress={() => onSubmit(note)} style={styles.buttonStyle}>
				<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>SAVE NOTE</Text>
			</TouchableOpacity>
		</View>
	);
};

NoteForm.defaultProps = {
	initialValues: {
		title: "",
		content: ""
	}
};

const styles = StyleSheet.create({
	input:{
		fontSize: 18,
		borderWidth: 0.5,
		borderRadius: 5,
		marginBottom: 15,
		padding: 5,
		marginHorizontal: 10,
		minHeight: 200,
		textAlignVertical: 'top'

	},
	label:{
		fontSize: 20,
		marginBottom: 10,
		marginLeft: 10
	},
	buttonStyle:{
		backgroundColor: '#294C60',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: 50,
		width: '30%',
		elevation: 10
	}
});

export default NoteForm;