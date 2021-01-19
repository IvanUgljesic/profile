let initialStatus = {message: '', error: '', success: ''};
const email = (email = initialStatus, action) => {
    switch(action.type){
        case 'SEND':
            return {
                ...action.payload
            };
        case 'ERROR':
            return {
                ...action.payload
            };
        case 'RESET':
            return {
                ...initialStatus
            }
        default:
            return email;
    }
}

export default email;