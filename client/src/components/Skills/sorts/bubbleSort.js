import { calculateMargin } from '../technologies';

const moveRight = (el, speed, margin) => {
    el.current.childNodes[2].style.border = '2px solid #e53935';
    let element = el.current
    let start = el.start;
    let vertical = 0;
    let end = start + el.current.offsetWidth + margin;
    let verticalHalfWay = Math.floor(el.current.offsetWidth + margin)/2 + start;

    let step = () => {
        start = start + speed > end ? end: start+speed; 
        vertical = start < verticalHalfWay ? vertical+speed:vertical-speed;
        if(vertical<0) vertical = 0;

        element.style.transform = 'translate(' + start + 'px, ' + vertical + 'px)';
        
        if (start >= end) { 
        el.current.childNodes[2].style.border = '';
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const moveLeft = (el, speed, margin) => {
    el.current.childNodes[2].style.border = '2px solid #e53935';
    let element = el.current
    let start = el.start;
    let vertical = 0;
    let end = start - el.current.offsetWidth - margin; 
    let verticalHalfWay = start - Math.floor(el.current.offsetWidth + margin)/2;

    let step = () => {
        start = start - speed < end ? end: start-speed; 
        vertical = start < verticalHalfWay ? vertical+speed:vertical-speed;
        if(vertical>0) vertical = 0;

        element.style.transform = 'translate(' + start + 'px, ' + vertical + 'px)';
        
        if (start <= end) {             
        el.current.childNodes[2].style.border = '';
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
        if(trackerRef.currentPosition > trackerRef.end) trackerRef.currentPosition = trackerRef.startingPosition;

        element.style.transform = 'translateX(' + startStep + 'px)';
        
        if (startStep >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }
        
        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
// { elRefs, technologies, speed, widthQ, trackerRef, order } ====>>>> input params
const bubbleSort = ({elRefs, technologies, speed, widthQ, trackerRef, order}) => {
    let margin = calculateMargin(widthQ);
    let len = elRefs.length;
    let tempArr = elRefs.map(el => {
        return {
            ...el,
            start: 0
        }
    });
    let trackerEl = { 
            ...trackerRef,
            startingPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft,
            end: elRefs[elRefs.length -1].current.offsetLeft - trackerRef.current.offsetLeft - elRefs[elRefs.length -1].current.offsetWidth - margin/2,
            currentPosition: elRefs[0].current.offsetLeft - trackerRef.current.offsetLeft
        }
    let tempTechs = technologies;
    let swapped;
    let procedure = [];
    do {
        swapped = false;
        for (let i = 0; i < len-1; i++) {
            if (order === 'asc' ? (tempTechs[i].value > tempTechs[i + 1].value):(tempTechs[i].value < tempTechs[i + 1].value)) {
                procedure.push(() => {
                    trackerMove(trackerEl, speed, margin, tempArr[i].current.offsetWidth);
                    trackerEl.currentPosition += tempArr[i].current.offsetWidth + margin;
                    moveRight(tempArr[i], speed, margin);
                    moveLeft(tempArr[i+1], speed, margin); 
                    tempArr[i].start += tempArr[i].current.offsetWidth + margin;
                    tempArr[i+1].start -= tempArr[i+1].current.offsetWidth + margin;
                    let tmp2 = tempArr[i];
                    tempArr[i] = tempArr[i + 1];
                    tempArr[i + 1] = tmp2;
                })  
                let tmp1 = tempTechs[i];
                tempTechs[i] = tempTechs[i + 1];
                tempTechs[i + 1] = tmp1;
                swapped = true;
            }
            else {
                procedure.push(() => {
                    trackerMove(trackerEl, speed, margin, tempArr[i].current.offsetWidth);
                    trackerEl.currentPosition += tempArr[i].current.offsetWidth + margin;
                })
            }
        }
    } while (swapped);
    return procedure;
}

export default bubbleSort;