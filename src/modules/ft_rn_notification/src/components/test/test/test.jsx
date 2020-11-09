import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native'
import designInterface from './designInterface.json';
class Test extends React.Component {
	render() {

		let loginDesign = {};
		designInterface.map((designItem) => {
			if (designItem.id === '_btnLogin2') {
				loginDesign = {
					...loginDesign,
					[designItem.property]: designItem.defaultValue
				};
			}
		});

		return (
			<View>
			<TouchableOpacity>
			<View style={[{
				marginTop:15,
				backgroundColor:"#FFFFFF",
				borderColor:"#000000",
				borderWidth:1,
				height:50,
				width:100,
				justifyContent:'center',
				alignItems:'center'
			},loginDesign]}>
			<Text style={{color:"#000000"}}>Button</Text>
			</View>
			</TouchableOpacity>
			</View>
		);
	}
}

const styles = {};

export default Test;
