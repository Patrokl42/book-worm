import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BooksCountContainer = ({color, type, ...props}) => {
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
                    {console.log(props.books[type])}
                    {props.books[type].length || 0}
                </Text>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return{
        books: state.books
    }
};

BooksCountContainer.defaultProps = {
    color: '#001fff'
};

BooksCountContainer.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(BooksCountContainer);