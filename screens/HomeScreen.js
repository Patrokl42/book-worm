import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';

import CustomActionButton from '../components/CustomActionButton';
import ListItem from '../components/ListItem';

import * as firebase from 'firebase/app';
import { snapshotToArray } from '../helpers/firebaseHelpers';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import ListEmptyComponent from '../components/ListEmptyComponent';
import Swipeout from 'react-native-swipeout';
import * as ImageHelpers from '../helpers/ImageHelpers';
import 'firebase/storage';

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            totalCount: 0,
            readingCount: 0,
            readCount: 0,
            isAddNewBookVisible: false,
            textInputData:'',
            books: [],
            currentUser: {},
            booksReading: [],
            booksRead: [],
            bookData: {
                author: '',
                publisher: ''
            }
        };
        this.textInputRef = null;
    }

    componentDidMount = async() => {
        try {
            const { navigation } = this.props;
            const user = navigation.getParam('user');

            const currentUserData = await firebase
                .database()
                .ref('users')
                .child(user.uid)
                .once('value');

            const books = await firebase.database().ref('books').child(user.uid).once('value');
            const booksArray = snapshotToArray(books);

            this.setState({
                currentUser: currentUserData.val(),
            });

            this.props.loadBooks(booksArray.reverse());
            this.props.toggleIsLoadingBooks(false);
        } catch (err) {
            console.log(err);
        }
    };

    showAddNewBook = () => {
        this.setState({
            isAddNewBookVisible: true
        });
    };

    hideAddNewBook = () => {
        this.setState({
            isAddNewBookVisible: false
        });
    };

    addBook = async book => {
        this.setState({textInputData:''});
        this.textInputRef.setNativeProps({ text: '' });
        this.props.toggleIsLoadingBooks(true);
        try {
            const snapshot = await firebase
                .database()
                .ref('books')
                .child(this.state.currentUser.uid)
                .orderByChild('name')
                .equalTo(book)
                .once('value');

            if(snapshot.exists()) {
                alert('Unable to add as book already exist')
            } else {
                const key = await firebase
                    .database()
                    .ref('books')
                    .child(this.state.currentUser.uid)
                    .push().key;

                const response = await firebase
                    .database()
                    .ref('books')
                    .child(this.state.currentUser.uid)
                    .child(key)
                    .set({ name: book, read: false });

                this.props.addBook({name: book, read: false, key:key})
                this.props.toggleIsLoadingBooks(false);
            }
        } catch (error) {
            console.log(error);
            this.props.toggleIsLoadingBooks(false);
        }
    };

    markAsRead = async (selectedBook, index) => {
        try {
            this.props.toggleIsLoadingBooks(true);

            await firebase.database().ref('books')
                .child(this.state.currentUser.uid).child(selectedBook.key)
                .update({read: true});

            let books = this.state.books.map(book => {
                if (book.name === selectedBook.name) {
                    return {...book, read: true}
                }
                return book
            });
            let booksReading = this.state.booksReading.filter(
                book => book.name !== selectedBook.name
            );

            this.props.markBooksAsRead(selectedBook);
            this.props.toggleIsLoadingBooks(false);

        } catch(err) {
            console.log(err);
            this.props.toggleIsLoadingBooks(false);
        }
    };

    markAsUnread = async (selectedBook, index) => {
        try {
            this.props.toggleIsLoadingBooks(true);

            await firebase
                .database()
                .ref('books')
                .child(this.state.currentUser.uid).child(selectedBook.key)
                .update({read: false});

            this.props.markBooksAsUnread(selectedBook);
            this.props.toggleIsLoadingBooks(false);
        } catch (err) {
            console.log(err);
            this.props.toggleIsLoadingBooks(false);
        }
    };

    uploadImage = async (image, selectedBook) => {
        const ref = firebase
                .storage()
                .ref('books')
                .child(this.state.currentUser.uid)
                .child(selectedBook.key);

        try {
            const blob = await ImageHelpers.prepareBlob(image.uri);
            const snapshot = await ref.put(blob);

            let dowloadUrl = await ref.getDownloadURL();

            await firebase
                .database()
                .ref('books')
                .child(this.state.currentUser.uid)
                .child(selectedBook.key)
                .update({image: dowloadUrl});

            blob.close();

            return dowloadUrl

        } catch (err) {
            console.log(err);
        }
    };

    openImageLibary = async (selectedBook) => {
        const result = await ImageHelpers.openImageLibary();

        if (result) {
            this.props.toggleIsLoadingBooks(true);
            const downloadUrl = await this.uploadImage(result, selectedBook);

            this.props.updateBookImage({...selectedBook, uri: downloadUrl});
            this.props.toggleIsLoadingBooks(false);
        }
    };

    openCamera = async (selectedBook) => {
        const result = await ImageHelpers.openCamera();

        if (result) {
            this.props.toggleIsLoadingBooks(true);
            const downloadUrl = await this.uploadImage(result, selectedBook);

            this.props.updateBookImage({...selectedBook, uri: downloadUrl});
            this.props.toggleIsLoadingBooks(false);

        }
    };

    addBookImage = (selectedBook) => {
        const options = ['Select from Photos', 'Camera', 'Cancel'];
        const cancelButtonIndex = 2;

        this.props.showActionSheetWithOptions(
            {
            options,
            cancelButtonIndex
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    this.openImageLibary(selectedBook)
                }
                else if (buttonIndex === 1) {
                    this.openCamera(selectedBook)
                }
            }
        )

    };

    deleteBook = async (selectedBook, index) => {
        try {
            this.props.toggleIsLoadingBooks(true);

            await firebase
                .database()
                .ref('books')
                .child(this.state.currentUser.uid).child(selectedBook.key)
                .remove();

            this.props.deleteBook(selectedBook);
            this.props.toggleIsLoadingBooks(false);

        } catch(err) {
            console.log(err);
            this.props.toggleIsLoadingBooks(false);
        }
    };

    renderItem = (item, index) => {

        let swipeoutButtons = [
            {
                text: 'Delete',
                component: (
                    <View style={{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name='md-trash' size={24} color='#fff'/>
                    </View>
                ),
                backgroundColor: '#c513af',
                onPress:() => this.deleteBook(item, index)
            }
        ];

        if (!item.read) {
            swipeoutButtons.unshift({
                text: 'Mark Read',
                component: (
                    <View style={{flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Text style={{color: '#fff', textAlign: 'center'}}>Mark as Read</Text>
                    </View>
                ),
                backgroundColor: '#17bebb',
                onPress:() => this.markAsRead(item,index)
            })
        } else {
            swipeoutButtons.unshift({
                text: 'Mark Unread',
                component: (
                    <View style={{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', textAlign: 'center'}}>Mark Unread</Text>
                    </View>
                ),
                backgroundColor: '#17bebb',
                onPress:() => this.markAsUnread(item,index)
            })
        }

        return (
            <Swipeout
                autoClose={true}
                style={{marginHorizontal: 5, marginVertical: 5, backgroundColor: '#f7f7f7'}}
                right={swipeoutButtons}
            >
                <ListItem
                    editable={true}
                    item={item}
                    marginVertical={0}
                    onPress={() => this.addBookImage(item)}
                >
                    {item.read && (
                        <Ionicons name='md-checkmark'
                                  size={32}
                                  style={{
                                      color: '#17bebb',
                                      marginVertical: 30,
                                      right: 5
                                  }}/>
                    )}
                </ListItem>
            </Swipeout>
        )
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fafafa'
            }}>
                <SafeAreaView/>
                <View style={styles.container}>
                    {this.props.books.isLoadingBooks && (
                        <View style={{
                            ...StyleSheet.absoluteFill,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            evaluate: 1000,
                            position: 'absolute'
                        }}>
                            <ActivityIndicator size='large' color='#c513af'/>
                        </View>
                    )}

                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter Book Name'
                            placeholderTextColor='#a7a9ac'
                            onChangeText={(text) => this.setState({textInputData: text})}
                            ref={component => {this.textInputRef = component}}>
                        </TextInput>
                    </View>

                    <FlatList
                        data={this.props.books.books}
                        renderItem={({item}, index) => this.renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            !this.props.books.isLoadingBooks && (
                                <ListEmptyComponent text='No books Read'/>
                            )
                        }
                    />

                    {this.state.textInputData.length > 0 ? (
                        <CustomActionButton
                            position='right'
                            onPress={()=> this.addBook(this.state.textInputData)}
                            style={styles.addNewBookButton}>
                            <Text style={{color: 'white', fontSize: 30}}>+</Text>
                        </CustomActionButton>
                    ) : null}

                </View>
                <SafeAreaView/>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return {
        books: state.books
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadBooks: books => dispatch({
            type: 'LOAD_BOOKS_FROM_SERVER',
            payload: books
        }),
        addBook: book =>
            dispatch({type: 'ADD_BOOK', payload: book}),
        markBooksAsRead: book =>
            dispatch({type: 'MARK_BOOK_AS_READ', payload: book}),
        markBooksAsUnread: book =>
            dispatch({type: 'MARK_BOOK_AS_UNREAD', payload: book}),
        toggleIsLoadingBooks: book =>
            dispatch({type: 'TOOGLE_IS_LOADING_BOOKS', payload: book}),
        deleteBook: book =>
            dispatch({type: 'DELETE_BOOK', payload: book}),
        updateBookImage: book =>
            dispatch({type: 'UPDATE_BOOK_IMAGE', payload: book})
    }
};

const wrapper = compose(
    connect(
    mapStateToProps,
    mapDispatchToProps
    ),
    connectActionSheet
);

export default wrapper(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    header: {
        height: 70,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E9E9E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    headerTitle: { fontSize: 24 },
    textInputContainer: {
        height: 50,
        flexDirection: 'row',
        margin: 5
    },
    textInput: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 5,
        borderBottomWidth: 2,
        borderColor: '#17bebb',
        fontSize: 22,
        fontWeight: '200',
        color: '#000000'
    },
    checkmarkButton: {
        backgroundColor: '#38e26f'
    },
    listItemContainer: {
        minHeight: 100,
        flexDirection:'row',
        backgroundColor:'#354D58DA',
        textAlign: 'center',
        marginVertical: 5
    },
    listItemTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    listEmptyComponent: {
        marginTop:50,
        alignItems: 'center'
    },
    addNewBookButton: {
        backgroundColor: '#17bebb',
        borderRadius: 25
    },
    footer: {
        height: 70,
        flexDirection: 'row',
    },
    listEmptyComponentText: {
        fontWeight:'bold'
    },
    markReadButton: {
        width: 100,
        backgroundColor: '#38e26f'
    }
});