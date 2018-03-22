const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                id: action.id,
                text: action.text,
                time: action.time,
                author: action.author,
                read: false
            };
        default:
            return state
    }
};

const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            if (state.map(m => m.id).includes(action.id)) {
                return state;
            }else{
                return [
                    ...state,
                    message(undefined, action)
                ]
            }
        case 'SEND_MESSAGE':
            return [
                ...state,
                message(undefined, action)
            ];
        case 'READ_MESSAGE':
            return Object.assign({}, state, {
                read: true
            });
        default:
            return state
    }
};

export default messages;