import { calculateMargin } from '../technologies';
// { elRefs, technologies, speed, widthQ, trackerRef, order } ====>>>> input params
const mergeSort = ({ elRefs, technologies, speed, widthQ, trackerRef, order }) => {
    let margin = calculateMargin(widthQ);
    let tempArr = elRefs.map((el, index) => {
        return {
            ...el,
            start: 0,
            value: technologies[index].value
        }
    });
    let trackerEl = { 
        ...trackerRef,
        startingPosition: 0,
        end: elRefs[1].current.offsetLeft - trackerRef.current.offsetLeft,// - elRefs[0].current.offsetWidth - margin/2,
        currentPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft
    }
    let procedure = [];
    procedure.push(() => {        
        trackerSetup(trackerEl, speed);
    })
    let mergeSortAlgo = (tempArr) => {
        const half = tempArr.length / 2;
        // Base case or terminating case
        if(tempArr.length < 2){      
            let temp = tempArr[0];
            if(temp.current){
                procedure.length > 1 && procedure.push(()=> {
                    trackerMove(trackerEl, speed);
                    trackerEl.end += temp.current.offsetWidth + margin;
                    trackerEl.currentPosition += temp.current.offsetWidth + margin;
                })
                procedure.push(() => {
                    markEl(temp, true)
                })
                /*procedure.push(() => {
                    markEl(temp, false)
                })*/
            }      
        return tempArr;
        }
        
        const left = tempArr.splice(0, half);
        return merge(mergeSortAlgo(left),mergeSortAlgo(tempArr));
    }
    const merge = (left, right) => {
        let arr = [];
        let temp = [...left, ...right];
        
        procedure.push(() => {
            for(let i=0; i<temp.length; i++){
                markEl(temp[i], true);
            }
        })
        procedure.push(() => {
            for(let i=0; i<temp.length; i++){
                moveUp(temp[i], speed);
            }
        })
        procedure.push(() => {
            //taking time....
        })
        procedure.push(() => {
            //taking time....
        })
        procedure.push(() => {
            //taking time....
        })
        // Break out of loop if any one of the array gets empty
        while (left.length && right.length) {
            // Pick the smaller among the smallest element of left and right sub arrays 
            if (order === 'asc' ? (left[0].value < right[0].value):(left[0].value > right[0].value)) {
                let element = left[0];
                let moveTo = (arr.length - temp.indexOf(element)) * (element.current.offsetWidth + margin);
                procedure.push(() => {
                    moveDown(element, speed, moveTo, margin);
                    element.start += moveTo ;
                })
                arr.push(left.shift())  
            } else {
                let element = right[0];
                let moveTo = (arr.length - temp.indexOf(element)) * (element.current.offsetWidth + margin);                
                procedure.push(() => {
                    moveDown(element, speed, moveTo, margin);
                    element.start += moveTo ;
                })
                arr.push(right.shift()) 
            }
        }
        
        // Concatenating the leftover elements
        // (in case we didn't go through the entire left or right array)
        let restOfElements = left.length ? left:right;
        restOfElements.forEach((el,index) => {
            let moveTo = (arr.length - temp.indexOf(el)) * (el.current.offsetWidth + margin);
            procedure.push(() => {
                moveDown(el, speed, moveTo, margin);
                el.start += moveTo;
            })
            arr.push(el)
        })
        procedure.push(() => {
            for(let i=0; i<temp.length; i++){
                markEl(temp[i], false);
            }
        })
        return arr;
    }
    mergeSortAlgo(tempArr);
    return procedure;
}

export default mergeSort;

const trackerMove = (el, speed) => {
    let element = el.current;
    let start = el.currentPosition;
    let end = el.end;
    let step = () => {
        start = start+speed  > end ? end: start+speed; 
        
        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const trackerSetup = (el, speed) => {
    let element = el.current;
    let start = el.startingPosition;
    let end = el.currentPosition;
    let step = () => {
        start = start-speed*4  < end ? end: start-speed*4; 
        
        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const markEl = (el, mark) => {
    if(mark)el.current.style.borderBottom = "3px solid #e53935";
    else el.current.style.borderBottom = "";
}

const moveUp = (el, speed) => {
    let element = el.current;
    let start = 0;
    let end = -120;
    let step = () => {
        start = start-speed  < end ? end: start-speed; 
        
        element.style.transform = 'translate(' + el.start + 'px,' + start + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}
const moveDown = (el, speed, moveTo, margin) => {
    let element = el.current;
    let xStart = el.start;
    let xEnd = el.start + moveTo;
    let speedQ = 1 + Math.abs(moveTo/(el.current.offsetWidth + margin));
    speedQ = speedQ < 3 ? 0.5:speedQ/2;
    let forward = xStart < xEnd;
    let yStart = -120;
    let yEnd = 0;
    let step = () => {
        yStart= yStart+speed > yEnd ? yEnd: yStart+speed;
        xStart = forward ? (xStart+speed*speedQ > xEnd ? xEnd:xStart+speed*speedQ): (xStart-speed*speedQ < xEnd ? xEnd: xStart-speed*speedQ);

        element.style.transform = 'translate('+ xStart + 'px,' + yStart + 'px)';

        if (yStart >= yEnd) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}