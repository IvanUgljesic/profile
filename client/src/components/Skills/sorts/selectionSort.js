import { calculateMargin } from '../technologies';

// { elRefs, technologies, speed, widthQ, trackerRef, order } ====>>>> input params
const selectionSort = ({ elRefs, technologies, speed, widthQ, trackerRef, order }) => { 
    let n = elRefs.length;
    let margin = calculateMargin(widthQ);
    let tempArr = elRefs.map(el => {
        return {
            ...el,
            start: 0
        }
    });
    let trackerEl = { 
        ...trackerRef,
        startingPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft,
        end: elRefs[elRefs.length -1].current.offsetLeft - trackerRef.current.offsetLeft - margin/2,
        currentPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft
    }
    let tempTechs = technologies;
    let procedure = [];
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        if(i !== n-1)
        procedure.push(() => {
            trackerMove(trackerEl, speed, margin, tempArr[i].current.offsetWidth);
            trackerEl.currentPosition += tempArr[i].current.offsetWidth + margin;
            trackerEl.startingPosition += tempArr[0].current.offsetWidth + margin;
            markMin(tempArr[i]);
        });
        for(let j = i+1; j < n; j++){
            let prevMin = i;
            if(j !== i+1) {
                procedure.push(() => {
                    trackerMove(trackerEl, speed, margin, tempArr[j].current.offsetWidth);
                    trackerEl.currentPosition += tempArr[j].current.offsetWidth + margin;
                });
            }
            if(order === 'asc' ? (tempTechs[j].value < tempTechs[min].value) : (tempTechs[j].value > tempTechs[min].value)) {
                prevMin = min;
                procedure.push(() => {
                    if(prevMin !== i)unmarkMin(tempArr[prevMin]);
                    markMin(tempArr[j]);
                });
                min=j; 
            }
         }
         if (min !== i) {
             // Swapping the elements
             let distance = min - i;
             procedure.push(() => {
                 moveLeft(tempArr[min], speed, margin, distance);
                 moveRight(tempArr[i], speed, margin, distance);
                 unmarkMin(tempArr[min]);
                 unmarkMin(tempArr[i]);
                 tempArr[min].start -= distance * (tempArr[min].current.offsetWidth + margin);
                 tempArr[i].start += distance * (tempArr[i].current.offsetWidth + margin);
                 let tmp2 = tempArr[min];
                 tempArr[min] = tempArr[i];
                 tempArr[i] = tmp2;
             })
             let tmp = tempTechs[i]; 
             tempTechs[i] = tempTechs[min];
             tempTechs[min] = tmp;      
        }
        else {
            procedure.push(() => {            
                unmarkMin(tempArr[i]);
            })
        }
    }
    return procedure;
}

export default selectionSort;

const markMin = (el) => {
    el.current.childNodes[2].style.border = '2px solid #e53935';
}

const unmarkMin = (el) => {
    el.current.childNodes[2].style.border = '';
}

const moveRight = (el, speed, margin, distance) => {
    let element = el.current
    let start = el.start;
    let end = start + distance * (el.current.offsetWidth + margin);

    let step = () => {
        start = start + (distance*speed) > end ? end: start+(distance*speed); 

        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

const moveLeft = (el, speed, margin, distance) => {
    let element = el.current
    let start = el.start;
    let end = start - distance * (el.current.offsetWidth + margin); 

    let step = () => {
        start = start - (distance*speed) < end ? end: start-(distance*speed); 

        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

const trackerMove = (trackerRef, speed, margin, distance) => {
    let element = trackerRef.current;
    let end = trackerRef.currentPosition + distance + margin; 
    //if(trackerRef.currentPosition > trackerRef.end) trackerRef.currentPosition = trackerRef.startingPosition;
    let startStep = trackerRef.currentPosition;

    let step = () => {
        startStep += speed; 

        element.style.transform = 'translateX(' + startStep + 'px)';
        if(trackerRef.currentPosition > trackerRef.end) trackerRef.currentPosition = trackerRef.startingPosition;
        
        if (startStep >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}