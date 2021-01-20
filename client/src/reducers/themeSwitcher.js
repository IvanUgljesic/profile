const colors = ['#36A39A', '#1e88e5', '#43a047', '#4D76A3'];
const fonts = ['Itim', 'PT Serif, serif', 'Roboto Slab, serif', 'Ubuntu, sans-serif', 'Caveat, cursive'];

 const theme = (theme = { color: colors[3], colorIndex: 3, font: fonts[3]}, action) => {
    switch(action.type){
        case 'CHANGE_COLOR':
            return {
                ...theme,
                color : colors[action.color],
                colorIndex: action.color
            }
        case 'CHANGE_FONT':
            return {
                ...theme,
                font : fonts[action.font],
            }
        default:
            return theme;
    }
}

export default theme;