import React from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';

const ParcelCount = ({ title, count }) => {
    return(
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontSize: 20}}>{title}</Text>
            <Text>{count}</Text>
        </View>
    )
};

ParcelCount.propTypes = {
    count: PropTypes.number.isRequired,
    title: PropTypes.string
};

ParcelCount.defaultProps = {
    title: 'Title'
};

export default ParcelCount;