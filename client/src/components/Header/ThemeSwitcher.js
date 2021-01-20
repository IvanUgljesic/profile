import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, RadioGroup, Box, Button, Menu } from '@material-ui/core';

import { GreenRadio, BlueRadio, OrangeRadio, RedRadio } from './styles';
import { useDispatch } from 'react-redux';
import { changeColor, changeFont } from '../../actions/themeSwitcher';
import useStyles from './styles';
import SettingsIcon from '@material-ui/icons/Settings';

 const ThemeSwitcher = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('3');
  const [selectedFont, setSelectedFont] = React.useState(3);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(changeColor(event.target.value));
  };

  const handleFont = (event) => {
    setSelectedFont(event.target.value);
    dispatch(changeFont(event.target.value));
  };

  return (
    <Grid container spacing={1} justify="flex-end">  
      <Box display={{ xs: 'none', sm: 'none', md: 'none' }}>
      <Grid container spacing={2} alignItems="stretch" justify="space-around">
        <Grid item xs={8}>
          <FormControl variant="outlined" control="radio" focused={true} fullWidth>
            <RadioGroup onChange={handleChange} value={selectedValue} className={classes.radioGroup} name="theme-switcher">
            <OrangeRadio
              checked={selectedValue === '0'}
              value="0"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '0' }}
            />
            <BlueRadio
              checked={selectedValue === '1'}
              value="1"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '1' }}
            />
            <GreenRadio
              checked={selectedValue === '2'}
              value="2"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '2' }}
            />
            <RedRadio
              checked={selectedValue === '3'}
              value="3"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '3' }}
            />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" focused={true}>
              <InputLabel id="demo-simple-select-outlined-label">Font</InputLabel>
              <Select
                id="demo-simple-select-outlined"
                value={selectedFont}
                onChange={handleFont}
                label="Font"
                margin="dense"
              >
                <MenuItem value={0} style={{ fontFamily: 'Itim' }}>Itim</MenuItem>
                <MenuItem value={1} style={{ fontFamily: 'PT Serif, serif' }}>PT Serif</MenuItem>
                <MenuItem value={2} style={{ fontFamily: 'Roboto Slab, serif' }}>Roboto</MenuItem>
                <MenuItem value={3} style={{ fontFamily: 'Ubuntu, sans-serif' }}>Ubuntu</MenuItem>
                <MenuItem value={4} style={{ fontFamily: 'Caveat, cursive' }}>Caveat</MenuItem>
              </Select>
            </FormControl> 
        </Grid>
      </Grid>
      </Box>      
      <Box display={{ sm: 'flex', md: 'flex' }}>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <SettingsIcon color="primary"/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <FormControl variant="outlined" className={classes.formControl} focused={true}>
                <InputLabel id="demo-simple-select-outlined-label">Font</InputLabel>
                <Select
                  id="demo-simple-select-outlined"
                  value={selectedFont}
                  onChange={handleFont}
                  label="Font"
                  margin="dense"
                  fullWidth
                >
                  <MenuItem value={0} style={{ fontFamily: 'Itim' }}>Itim</MenuItem>
                  <MenuItem value={1} style={{ fontFamily: 'PT Serif, serif' }}>PT Serif</MenuItem>
                  <MenuItem value={2} style={{ fontFamily: 'Roboto Slab, serif' }}>Roboto</MenuItem>
                  <MenuItem value={3} style={{ fontFamily: 'Ubuntu, sans-serif' }}>Ubuntu</MenuItem>
                  <MenuItem value={4} style={{ fontFamily: 'Caveat, cursive' }}>Caveat</MenuItem>
                </Select>
              </FormControl> 
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormControl variant="outlined" control="radio" focused={true}>
              <InputLabel id="theme-switcher-label">Theme</InputLabel> 
              <RadioGroup onChange={handleChange} value={selectedValue} className={classes.radioGroup} name="theme-switcher">
              <OrangeRadio
                checked={selectedValue === '0'}
                value="0"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '0' }}
              />
              <BlueRadio
                checked={selectedValue === '1'}
                value="1"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '1' }}
              />
              <GreenRadio
                checked={selectedValue === '2'}
                value="2"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '2' }}
              />
              <RedRadio
                checked={selectedValue === '3'}
                value="3"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '3' }}
              />
              </RadioGroup>
            </FormControl>
          </MenuItem>
        </Menu>
      </Box>
    </Grid>
  );
}

export default ThemeSwitcher;
