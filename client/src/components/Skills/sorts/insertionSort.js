import { calculateMargin } from '../technologies';

// { elRefs, technologies, speed, widthQ, trackerRef, order } ====>>>> input params
const insertionSort = ({ elRefs, technologies, speed, widthQ, trackerRef, order }) => {
    let n = technologies.length;
    let margin = calculateMargin(widthQ);
    let tempArr = elRefs.map(el => {
        return {
            ...el,
            start: 0
        }
    });
    let trackerEl = { 
        ...trackerRef,
        startingPosition: elRefs[1].current.offsetLeft - trackerRef.current.offsetLeft,
        end: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft - elRefs[0].current.offsetWidth - margin/2,
        currentPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft
    }
    let tempTechs = technologies;
    let procedure = [];
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = tempArr[i];
        let current1 = tempTechs[i];
        if(trackerEl.startingPosition !== trackerEl.currentPosition)
            procedure.push(() => {
                trackerMoveRight(trackerEl, speed, margin, i);
                trackerEl.currentPosition = trackerEl.startingPosition;
            });
        procedure.push(() => {
            moveDown(current, speed);
            trackerEl.startingPosition += current.current.offsetWidth + margin;
        });
        // The last element of our sorted subarray
        let j = i-1; 
        while ((j > -1) && (order === 'asc' ? current1.value < tempTechs[j].value : current1.value > tempTechs[j].value)) {
            let tempJ = j;
            procedure.push(() => {
                trackerMoveLeft(trackerEl, speed, margin, tempArr[0].current.offsetWidth);
                trackerEl.currentPosition -= current.current.offsetWidth + margin;
                moveRight(tempArr[tempJ], speed, margin);
                moveLeft(current, speed, margin);
                current.start -= current.current.offsetWidth + margin;
                tempArr[tempJ].start += tempArr[tempJ].current.offsetWidth + margin;
                tempArr[tempJ+1] = tempArr[tempJ];
            })
            tempTechs[j+1] = tempTechs[j];
            j--;
        }
        procedure.push(() => {
            moveUp(current, speed);
            tempArr[j+1] = current;
        });
        tempTechs[j+1] = current1;
    }
    return procedure;
}

export default insertionSort;

const moveUp = (el, speed) => {
    let element = el.current;
    let xPosition = el.start;
    let start = -20;
    let end = 0;
    let step = () => {
        start = start + speed > end ? end: start+speed; 
        
        element.style.transform = 'translate('+ xPosition + 'px,' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}
const moveDown = (el, speed) => {
    let element = el.current;
    let xPosition = el.start;
    let start = 0;
    let end = -20;
    let step = () => {
        start= start - speed < end ? end: start-speed; 

        element.style.transform = 'translate('+ xPosition + 'px,' + start + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const moveRight = (el, speed, margin) => {
    let element = el.current
    let start = el.start;
    let end = start + (el.current.offsetWidth + margin);

    let step = () => {
        start = start + speed > end ? end: start+speed; 

        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

const moveLeft = (el, speed, margin) => {
    let element = el.current
    let yPosition = -20;
    let start = el.start;
    let end = start - el.current.offsetWidth - margin; 
    let step = () => {
        start = start - speed < end ? end: start - speed; 

        element.style.transform = 'translate(' + start + 'px,' + yPosition + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

const trackerMoveRight = (trackerRef, speed, margin, elementNo) => {
    let element = trackerRef.current;
    let start = trackerRef.currentPosition;
    let end = trackerRef.startingPosition; 
    let speedCalc = Math.round((end-start)/trackerRef.current.offsetWidth);
    let step = () => {
        start += speed*speedCalc; 
        if(start > end) start = end;

        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
const trackerMoveLeft = (trackerRef, speed, margin, distance) => {
    let element = trackerRef.current;
    let end = trackerRef.currentPosition - trackerRef.current.offsetWidth - margin; 
    let startStep = trackerRef.currentPosition;

    let step = () => {
        startStep -= speed; 
        if(startStep < end) startStep = end;

        element.style.transform = 'translateX(' + startStep + 'px)';
        
        if (startStep <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}