import React from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ParcelsCountContainer = ({color, type, ...props}) => {
    return (
        <View style={{
            flex: 1,
            paddingTop: 5
        }}>
            <View style={{
                backgroundColor: color,
                borderRadius: 10,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{color: '#fff'}}>
                    {props.parcels[type].length || 0}
                </Text>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return{
        parcels: state.parcels
    }
};

ParcelsCountContainer.defaultProps = {
    color: '#001fff'
};

ParcelsCountContainer.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ParcelsCountContainer);