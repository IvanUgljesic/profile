const qanda = (qanda = [], action) => {
    switch(action.type){
        case 'FETCH_QANDAS':
            return action.payload;
        case 'CREATE_QANDA':
            return [...qanda, action.payload];
        default:
            return qanda;
    }
}

export default qanda;