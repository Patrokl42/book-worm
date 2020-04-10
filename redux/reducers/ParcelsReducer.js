const initialState = {
    parcels: [],
    parcelsOnWay: [],
    parcelsReceived: [],
    isLoading: true,
    image: null
};

const parcels = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_PARCELS_FROM_SERVER':
            return {
                ...state,
                parcels: action.payload,
                parcelsOnWay: action.payload.filter(parcel => !parcel.received),
                parcelsReceived: action.payload.filter(parcel => parcel.received)
            };

        case 'ADD_PARCEL':
            return {
                ...state,
                parcels: [action.payload, ...state.parcels],
                parcelsOnWay: [action.payload, ...state.parcelsOnWay],
            };

        case 'MARK_PARCEL_AS_RECEIVED':
            return {
                ...state,
                parcels: state.parcels.map(parcel => {
                    if (parcel.key === action.payload.key) {
                        return { ...parcel, received: true};
                    }
                    return parcel
                }),
                parcelsOnWay: state.parcelsOnWay.filter(
                    parcel => parcel.key !== action.payload.key
                ),
                parcelsReceived: [...state.parcelsReceived, action.payload]
            };

        case 'TOOGLE_IS_LOADING_PARCEL':
            return {
                ...state,
                isLoadingParcels: action.payload
            };

        case 'MARK_PARCEL_AS_NOT_RECEIVED':
            return {
                ...state,
                parcels: state.parcels.map(parcel => {
                    if (parcel.key === action.payload.key) {
                        return { ...parcel, received: false};
                    }
                    return parcel
                }),
                parcelsOnWay: [...state.parcelsOnWay, action.payload],
                parcelsReceived: state.parcelsReceived.filter(
                    parcel => parcel.key !== action.payload.key
                )
            };

        case 'DELETE_PARCEL':
            return {
                parcels: state.parcels.filter(parcel => parcel.key !== action.payload.key),
                parcelsOnWay: state.parcelsOnWay.filter(parcel => parcel.key !== action.payload.key),
                parcelsReceived: state.parcelsReceived.filter(parcel => parcel.key !== action.payload.key),
            };

        case 'UPDATE_PARCEL_IMAGE':
            return {
                ...state,
                parcels: state.parcels.map(parcel => {
                    if (parcel.key === action.payload.key) {
                        return { ...parcel, image: action.payload.uri};
                    }
                    return parcel
                }),
                parcelsOnWay: state.parcelsOnWay.map(parcel => {
                    if (parcel.key === action.payload.key) {
                        return { ...parcel, image: action.payload.uri};
                    }
                    return parcel
                }),
                parcelsReceived: state.parcelsReceived.map(parcel => {
                    if (parcel.key === action.payload.key) {
                        return { ...parcel, image: action.payload.uri};
                    }
                    return parcel
                })
            };

        default:
            return state
    }
};

export default parcels;