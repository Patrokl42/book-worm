import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import ListItem from "../../components/ListItem";
import {connect} from "react-redux";
import ListEmptyComponent from '../../components/ListEmptyComponent';

class ParcelsReceivedScreen extends Component {

    renderItem = (item) => {
        return <ListItem item={item}/>
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f7f7f7',
                paddingLeft: 5,
                paddingRight: 5
            }}>
                {this.props.parcels.isLoadingParcels && (
                    <View style={{
                        ...StyleSheet.absoluteFill,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        evaluate: 1000
                    }}>
                        <ActivityIndicator size='large' color='#c513af'/>
                    </View>
                )}
                <FlatList
                    data={this.props.parcels.parcelsReceived}
                    renderItem={({item}, index) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        !this.props.parcels.isLoadingParcels && (
                            <ListEmptyComponent text='No Parcels Received'/>
                        )
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        parcels: state.parcels
    }
};

export default connect(mapStateToProps)(ParcelsReceivedScreen);