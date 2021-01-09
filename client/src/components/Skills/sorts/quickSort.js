import { calculateMargin } from '../technologies';
// { elRefs, technologies, speed, widthQ, trackerRef, order } ====>>>> input params
const quickSort = ({ elRefs, technologies, speed, widthQ, trackerRef, order }) => {
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
    let swap = (items, leftIndex, rightIndex) => {
        let temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }
    let partition = (items, left, right) => {
        let pivot   = items[Math.floor((right + left) / 2)], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
            let tempItems = items;
            procedure.push(() => {
                let trackerMoveTo = items[items.indexOf(pivot)].current.offsetLeft + items[items.indexOf(pivot)].start - trackerEl.current.offsetLeft;
                trackPivot(trackerEl, trackerMoveTo, speed);
                trackerEl.startingPosition = trackerMoveTo;
            })
            procedure.push(() => {
                tempItems.forEach((item, index) => {
                    if(index >= left && index<=right)markItem(item, 'red');
                })
            })
        while (i <= j) {
            procedure.push(() => {
                // taking time for transition to complete
            })
            if(order === 'asc'){
                while (items[i].value < pivot.value) {
                    i++;
                }
                while (items[j].value > pivot.value) {
                    j--;
                }
            }
            if(order === 'desc'){
                while (items[i].value > pivot.value) {
                    i++;
                }
                while (items[j].value < pivot.value) {
                    j--;
                }
            }
            if (i <= j) {
                let element1 = tempItems[i];
                let element2 = tempItems[j];
                procedure.push(() => {
                    markItem(element1, 'green');
                    markItem(element2, 'green');
                })
                procedure.push(() => {
                    let distance = element1.current.offsetLeft + element1.start - element2.current.offsetLeft - element2.start;
                    moveRight(element1, speed, distance, margin);
                    moveLeft(element2, speed, distance, margin);
                    element1.start -= distance; 
                    element2.start += distance; 
                })
                procedure.push(() => {
                    // taking time for transition to complete
                })
                swap(items, i, j); //sawpping two elements
                i++;
                j--;
            }
        }
        procedure.push(() => {
            tempItems.forEach((item, index) => {
                if(index >= left && index <= right)markItem(item, 'none');
            })
        })
        return i;
    }

    let quickSortAlgo = (items, left, right) => {
        let index;
        procedure.push(() => {
            // taking time for transition to complete
        })
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                quickSortAlgo(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                quickSortAlgo(items, index, right);
            }
        }
        return items;
    }
    quickSortAlgo(tempArr, 0, tempArr.length-1);
    return procedure;
}

export default quickSort;

const trackPivot = (el, moveTo, speed1) => {
    let speed = speed1 * 5;
    let element = el.current;
    let start = el.startingPosition;
    let end = moveTo;
    let forward = start < end;
    let step = () => {
        start = forward ? (start+speed > end ? end:start+speed ): (start-speed < end ? end: start-speed); 
        
        element.style.transform = 'translateX(' + start + 'px)';
        
        if (forward ? (start >= end):(start <= end)) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const moveLeft = (el, speed, distance) => {
    let element = el.current;
    let start = el.start;
    let end = el.start+distance;
    let calculateSpeed = speed + Math.ceil(Math.abs(distance/el.current.offsetWidth) / speed);
    calculateSpeed = calculateSpeed >= 7 ? 10: calculateSpeed;
    let step = () => {
        start = start-calculateSpeed  < end ? end: start-calculateSpeed; 
        
        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start <= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const moveRight = (el, speed, distance) => {
    let element = el.current;
    let start = el.start;
    let end = el.start-distance;
    let calculateSpeed = speed + Math.ceil(Math.abs(distance/el.current.offsetWidth) / speed);
    calculateSpeed = calculateSpeed >= 7 ? 10: calculateSpeed;
    let step = () => {
        start = start+calculateSpeed  > end ? end: start+calculateSpeed; 
        
        element.style.transform = 'translateX(' + start + 'px)';
        
        if (start >= end) { 
        window.cancelAnimationFrame(step);
        return;
        }

        
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

}

const markItem = (item, flag) => {
    switch(flag){
        case 'red':
            return item.current.style.borderBottom = "3px solid #e53935";
        case 'green':
            return item.current.style.borderBottom = "3px solid green";;
        case 'none':
            return item.current.style.borderBottom = "0";
        default:
            return null;    
    }
}