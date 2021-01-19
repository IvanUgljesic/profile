import * as api from '../api';

export const sendEmail = (email) => async (disptach) => {
    try{
        const { data } = await api.sendEmail(email);

        disptach({ type: 'SEND', payload: data})
    } catch (error) {
        disptach({ type: 'ERROR', payload: error})
    }
}

export const resetStatus = () => (dispatch) => {
    dispatch({ type: 'RESET', payload: null})
}