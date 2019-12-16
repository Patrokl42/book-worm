import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

const ListEmptyComponent = ({text}) => {
    return (
        <View style={{
            marginTop: 50,
            alignItems: 'center'
        }}>
            <Text style={{fontWeight: 'bold'}}>{text}</Text>
        </View>
    );
};

ListEmptyComponent.propTypes = {
    text: PropTypes.string.isRequired
};

export default ListEmptyComponent;