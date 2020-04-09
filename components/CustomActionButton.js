import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';

function getPosition(position) {
    switch (position) {
        case 'left':
            return {position: 'absolute', left: 20, bottom: 200};
        default:
            return {position: 'absolute', right: 20, bottom: 180};
    }
}

const CustomActionButton = ({children, onPress, style, position}) => {

    const floatingActionButton = position ? getPosition(position): [];

    return(
        <TouchableOpacity onPress={onPress} style={floatingActionButton}>
            <View style={[styles.button, style]}>{children}</View>
        </TouchableOpacity>
    );
};

CustomActionButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    styles: PropTypes.object
};

CustomActionButton.defaultProps = {
    styles: {}
};

export default CustomActionButton;

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#e2001b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
});