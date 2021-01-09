import * as api from '../api';

// Action Creators
export const getQandAs = () => async (dispatch) => {

    try{
        const { data } = await api.fetchQandAs();

        dispatch({ type: 'FETCH_QANDAS', payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const createQandA = (qanda) => async (disptach) => {
    try{
        const { data } = await api.createQandA(qanda);

        disptach({ type: 'CREATE_QANDA', payload: data})
    } catch (error) {
        console.log(error);
    }
}