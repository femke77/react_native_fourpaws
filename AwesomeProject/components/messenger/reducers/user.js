const initialState = {
    uid: null,
    name: null,
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
    authorized: false   // left for future troubleshooting
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return Object.assign({}, state, {
                uid: action.uid
            });
        case 'SET_USER_NAME':
            return Object.assign({}, state, {
                name: action.name
            });
        case 'SET_USER_AVATAR':
            return Object.assign({}, state, {
                avatar: action.avatar
            });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorized: true
            });
        case 'USER_NO_EXIST':
            return Object.assign({}, state, {
                authorized: false
            });

        default:
            return state
    }
};

export default user;