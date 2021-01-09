export const changeColor = (color) => (dispatch) => {
    dispatch({ type: 'CHANGE_COLOR', color  });
}

export const changeFont = (font) => (dispatch) => {
    dispatch({ type: 'CHANGE_FONT', font  });
}