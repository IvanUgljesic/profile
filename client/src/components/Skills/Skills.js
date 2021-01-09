import React, { useEffect } from 'react';
import useStyles from './styles';
import { 
    Grid,
    Box, 
    IconButton, 
    Typography, 
    Button, 
    Paper,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
} from '@material-ui/core';
import Canvas from './Canvas';
import { technologies, useWidth, getQ, sortTypes, sortsStories, shuffle } from './technologies';
import InfoIcon from '@material-ui/icons/Info';
import { FaRegHandPointer, FaPlay, FaPause, FaFastForward, FaRandom, FaSignal } from 'react-icons/fa';

// sorting algorithms
import bubbleSort from './sorts/bubbleSort';
import selectionSort from './sorts/selectionSort';
import insertionSort from './sorts/insertionSort';
import mergeSort from './sorts/mergeSort';
import quickSort from './sorts/quickSort';

// RxJS v6+
import { from } from 'rxjs';
import { map, delay, mergeMap } from 'rxjs/operators';


const Skills = (props) => {
    const classes = useStyles();
    const [dimensions, setDimensions] = React.useState({ 
      height: window.innerHeight,
      width: window.innerWidth
    });    

    // bars width on resolution change
    const widthParam = useWidth();
    const widthQ = getQ(widthParam);

    // elRefs, technologies, speed, widthQ, trackerRef, order
    const [sortParams, setSortParams] = React.useState({
        elRefs: [],
        technologies,
        speed: 3,
        widthQ,
        trackerRef: null,
        order: 'asc'
    })
    const [items, setItems] = React.useState([...technologies]);
    const [sortType, setSortType] = React.useState({ name: 'none', message: ''});

    // sort actions
    const [sortProgress, setSortProgress] = React.useState({
        funcs: [],
        currentFunc: 0,
        inProgress: false,
        sorted: false,
        pause: false,
        observer: null
    });  

    const [error, setError] = React.useState(null);

    useEffect(() => {
        let handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })      
        }     
        window.addEventListener('resize', handleResize);       
        return _ => {
            window.removeEventListener('resize', handleResize);
        }  
    },[]);

    useEffect(() => {      
        setSortParams(s => {
            return {
                ...s,
                elRefs: [...Array(items.length).fill().map((_, i) => React.createRef())], // add refs
                widthQ,
                trackerRef: s.trackerRef || React.createRef()
            }
        });
    }, [dimensions, widthQ, items]);

    
    const algo = (type) => {
        switch(type){  
            case 'Bubble':
                return  bubbleSort(sortParams);
            case 'Selection':
                return selectionSort(sortParams);
            case 'Insertion':
                return insertionSort(sortParams);
            case 'Merge':
                return mergeSort(sortParams);
            case 'Quick':
                return quickSort(sortParams);
            default:
                return [];
        }
    }

    const handleSortType = (e) => { 
        setError(null);
        let type = e.target.value;
        let sortType =  sortsStories.filter((sort) => sort.name === type);

        if(type !== 'none'){
            setSortType(sortType[0]);
        }
        else {
            setSortType({ name: 'none', message: ''});   
            setSortProgress(s => {
                return ({
                    ...s,
                    funcs: [],
                })
            });         
        }
    }

    const handleOrder = (e) => {
        setSortParams({
            ...sortParams,
            order: sortParams.order === 'asc' ? 'desc':'asc'
        })
    } 
    // start
    const handleStart = () => {     
        let procedure = algo(sortType.name);
        let funcsObservable = from(procedure);
        let observable = funcsObservable.pipe(
            mergeMap((func,i) => from([func]).pipe(delay(1000/sortParams.speed*i))),
            map((func, i) => {
                func()
                setSortProgress(s => {
                    return {
                        ...s,
                        currentFunc: i
                    }
                })
            })
        );
        setSortProgress(s => {
            return ({
                ...s,
                inProgress: true,
                observer: observable.subscribe({
                    complete: () => setSortProgress({
                        funcs: [],
                        currentFunc: 0,
                        sorted: true,
                        inProgress: false,
                        pause: false
                    })
                }),
                funcs: procedure
            })
        }); 
    }

    // pause
    const handlePause = () => {
        sortProgress.observer.unsubscribe();
        setSortProgress(s => {
            return {
                ...s,
                pause: true,
                inProgress: false,
                funcs: s.funcs.slice(sortProgress.currentFunc + 1)
            }
        });
    }

    // resume
    const handleResume = () => {
        let resumable = from(sortProgress.funcs);
        let observable = resumable.pipe(
            mergeMap((func,i) => from([func]).pipe(delay(1000/sortParams.speed*i))),
            map((func, i) => {
                func()
                setSortProgress(s => {
                    return {
                        ...s,
                        currentFunc: i,
                    }
                })
            })
        );
        setSortProgress(s => {
            return {
                ...s,
                inProgress: true,
                pause: false,
                observer: observable.subscribe({
                    complete: () => setSortProgress({
                        funcs: [],
                        currentFunc: 0,
                        sorted: true,
                        inProgress: false,
                        pause: false
                    })
                })
            }
        })
    }

    // FF
    const handleFastForward = () => {   
        setTimeout(() => {
            let sorted = technologies.sort((a, b) => sortParams.order === 'asc' ? a.value - b.value : b.value - a.value);
            sortParams.elRefs.forEach(x => {
                x.current.style.transform = '';
                x.current.childNodes[2].style.border = ''
                x.current.style.borderBottom = ''
            });
            setItems([...sorted]);   
            sortParams.trackerRef.current.style.transform = '';
            setSortProgress({
                funcs: [],
                currentFunc: 0,
                observer: null,
                sorted: true,
                inProgress: false,
                pause: false
            })

        }, 1000/sortParams.speed + 250);
    }

    const handleShuffle = () => {
        setSortType({ name: 'none', message: ''});  
        let randomArr = shuffle(technologies);
        sortParams.elRefs.forEach(x => x.current.style.transform = '');
        sortParams.trackerRef.current.style.transform = '';
        setSortProgress({
            funcs: [],
            currentFunc: 0,
            observer: null,
            inProgress: false,
            sorted: false,
            pause: false
        });
        setItems([...randomArr]);
    }
    return (
        <Grid container spacing={3} justify="center" alignItems="center" direction="column" className={classes.root}>    
            <Grid item xs={12} align="center">
             <Box className={classes.message}>
                <Typography variant="body1" color="inherit" component="p" gutterBottom>
                    This page represents visualisation of some of the most common sorting algorithms in programming.
                </Typography>
                <Typography variant="caption" color="inherit" component="p" gutterBottom>
                   * bars height is based on my time spent in each of this technologies.
                </Typography>
             </Box>
            </Grid>          
            <Paper className={classes.techPaper}> {/* SCREEN */}
                <Grid container>
                    <Grid item xs={12} className={classes.algoInfo}>
                        <Box style={{ display: sortType.name !== 'none' ? 'block':'none'}}>                        
                            <Typography variant="caption" align="justify" className={classes.algoInfoText} color="primary">
                                <InfoIcon className={classes.infoIcon}/>
                                {sortType.message}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className={classes.techBars}>
                        {
                            
                            items.map((item, index) => {
                                return (
                                    <Box ref={sortParams.elRefs[index]} key={item.name} direction="column" className={classes.techBox} width={Math.round(dimensions.width * widthQ/100)}>
                                        <Typography variant="caption" align="center" noWrap className={classes.techName}>{item.name}</Typography>
                                            <Canvas width={dimensions.width * widthQ/100} height={item.value*(20/(widthQ === 2 ? 3:widthQ))} color={item.color} className={classes.canvas}/>
                                        <IconButton size="small" style={{ color: item.color}} className={classes.techIcons}>{item.icon}</IconButton>
                                    </Box>
                                )
                            })       
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.tracker}>
                        <Box ref={sortParams.trackerRef} key="tracker" className={classes.trackerBar} width={Math.round(dimensions.width * widthQ/100)}>
                            <IconButton size="small" style={{color: sortProgress.sorted ? 'green' : '#e53935'}} className={classes.techIcons}><FaRegHandPointer/></IconButton>
                            <Typography variant="caption" align="center" noWrap className={classes.techName} style={{color: sortProgress.sorted ? 'green' : '#e53935'}}>{sortProgress.sorted ? 'the array is sorted':''}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>    
            <Paper className={classes.techControlsPaper}>{/* CONTROLS */}
                <Grid container alignContent="center" alignItems="center" spacing={3} className={classes.techControls}>
                    <Grid item xs={12} sm={4} align="center">
                        <FormControl variant="outlined" focused={true} fullWidth margin="dense" color="primary">
                            <InputLabel id="demo-simple-select-outlined-label">Sort algo</InputLabel>
                            <Select
                            disabled={sortProgress.inProgress || sortProgress.pause}
                            id="demo-simple-select-outlined"
                            onChange={handleSortType}
                            label="Sort algo"
                            margin="dense"
                            fullWidth
                            value={sortType.name}
                            >
                            {
                                sortTypes.map((sort, index) => {
                                    return (
                                        <MenuItem value={sort} key={sort}>{sort}</MenuItem>  
                                    )   
                                })
                            }
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={12} sm={4} align="center">
                        <Slider
                            color="primary"
                            value={sortParams.speed}
                            aria-labelledby="discrete-slider-small-steps"
                            disabled={sortProgress.inProgress || sortProgress.pause}
                            step={1}
                            marks
                            min={1}
                            max={5}
                            valueLabelDisplay="auto"
                            onChange={(e, newValue) => setSortParams({...sortParams, speed:newValue})}
                        />
                        <Typography id="discrete-slider-small-steps" color="primary">
                            Speed
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} align="center">
                        <FormControl variant="outlined" focused={true} fullWidth margin="dense">
                        <Button
                            color="primary"
                            style={{textTransform: 'none', justifyContent: 'space-around'}}
                            id="demo-simple-btn-outlined"
                            disabled={sortProgress.inProgress || sortProgress.pause}
                            variant="outlined"
                            label="order"
                            onClick={() => handleOrder()}
                        >
                            { sortParams.order === 'asc' ? 'ascending': 'descending'}
                            { sortParams.order === 'asc' ? <FaSignal />:<FaSignal style={{transform: 'rotateY(-180deg)'}}/> }
                        </Button>
                        </FormControl> 
                    </Grid>
                <Grid item xs={12} className={classes.controls}>
                    <Button
                        color="primary"
                        disabled={sortProgress.inProgress  || sortProgress.pause}
                        variant="outlined"
                        onClick={() => handleShuffle()}
                    >
                        <FaRandom />
                    </Button>
                    <Button
                        color="primary"
                        disabled={sortProgress.sorted || sortProgress.inProgress}
                        variant="outlined"
                        onClick={() => sortProgress.pause ? handleResume(): sortType.name === 'none' ? setError('u must select sort algorithm'): handleStart()}
                    >
                        <FaPlay />
                    </Button>
                    <Button
                        color="primary"
                        disabled={!sortProgress.inProgress}
                        variant="outlined"
                        onClick={() => handlePause()}
                    >
                        <FaPause />
                    </Button>
                    <Button
                        color="primary"
                        disabled={sortProgress.sorted || sortProgress.inProgress || !sortProgress.funcs.length}
                        variant="outlined"
                        onClick={() => handleFastForward()}   
                    >
                        <FaFastForward />
                    </Button>
                </Grid> 
                <Grid item xs={12} className={classes.errorInfo}>
                    <Typography variant="caption" color="error">{error ? error : ''}</Typography>                
                </Grid>
                </Grid>               
            </Paper>
        </Grid>
    )
}

export default Skills;