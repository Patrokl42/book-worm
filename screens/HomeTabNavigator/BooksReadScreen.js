import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import ListItem from "../../components/ListItem";
import {connect} from "react-redux";
import ListEmptyComponent from '../../components/ListEmptyComponent';

class BooksReadScreen extends Component {

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
                {this.props.books.isLoadingBooks && (
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
                    data={this.props.books.booksRead}
                    renderItem={({item}, index) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        !this.props.books.isLoadingBooks && (
                            <ListEmptyComponent text='No books Read'/>
                        )
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        books: state.books
    }
};

export default connect(mapStateToProps)(BooksReadScreen);