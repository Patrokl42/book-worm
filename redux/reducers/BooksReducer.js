const initialState = {
    books: [],
    booksReading: [],
    booksRead: [],
    isLoading: true,
    image: null
};

const books = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_BOOKS_FROM_SERVER':
            return {
                ...state,
                books: action.payload,
                booksReading: action.payload.filter(book => !book.received),
                booksRead: action.payload.filter(book => book.received)
            };

        case 'ADD_BOOK':
            return {
                ...state,
                books: [action.payload, ...state.books],
                booksReading: [action.payload, ...state.booksReading],
            };

        case 'MARK_BOOK_AS_READ':
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.departureCode === action.payload.departureCode) {
                        return { ...book, received: true};
                    }
                    return book
                }),
                booksRead: [...state.booksRead, action.payload],
                booksReading: state.booksRead.filter(
                    book => book.departureCode !== action.payload.departureCode
                )
            };

        case 'TOOGLE_IS_LOADING_BOOKS':
            return {
                ...state,
                isLoadingBooks: action.payload
            };

        case 'MARK_BOOK_AS_UNREAD':
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.departureCode === action.payload.departureCode) {
                        return { ...book, received: false};
                    }
                    return book
                }),
                booksRead: state.booksRead.filter(
                    book => book.departureCode !== action.payload.departureCode
                ),
                booksReading: [...state.booksReading, action.payload],
            };

        case 'DELETE_BOOK':
            return {
                books: state.books.filter(book => book.departureCode !== action.payload.departureCode),
                booksRead: state.booksRead.filter(book => book.departureCode !== action.payload.departureCode),
                booksReading: state.booksReading.filter(book => book.departureCode !== action.payload.departureCode)
            };

        case 'UPDATE_BOOK_IMAGE':
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.departureCode === action.payload.departureCode) {
                        return { ...book, image: action.payload.uri};
                    }
                    return book
                }),
                booksReading: state.booksReading.map(book => {
                    if (book.departureCode === action.payload.departureCode) {
                        return { ...book, image: action.payload.uri};
                    }
                    return book
                }),
                booksRead: state.booksRead.map(book => {
                    if (book.departureCode === action.payload.departureCode) {
                        return { ...book, image: action.payload.uri};
                    }
                    return book
                })
            };

        default:
            return state
    }
};

export default books;