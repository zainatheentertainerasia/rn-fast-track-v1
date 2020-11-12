import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const SimpleRadioButton = ({size, onPress, isSelected, color}) => {

    return (
        <Ionicons onPress={onPress} size={size || 20} color={color} name={isSelected ? 'md-radio-button-on' : 'md-radio-button-off'} />
    );
}

export default SimpleRadioButton;