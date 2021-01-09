import { SiJavascript, SiVueDotJs, SiRedux, SiMaterialUi, SiFirebase, SiMongodb, SiHtml5, SiBootstrap, SiJquery, SiNodeDotJs } from 'react-icons/si';
import { DiJava, DiMysql, DiCss3, DiReact } from 'react-icons/di';
import { useMediaQuery, useTheme } from '@material-ui/core';
import RxjsIcon from './rxjs';

export const sortTypes = ['none', 'Bubble', 'Selection', 'Merge', 'Quick', 'Insertion'];


export const technologiesTypes = ['All', 'front-end', 'back-end', 'database'];
export const sortsStories = [
  { name: 'Bubble', message: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.' },
  {
    name: 'Selection', message: `The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order)
     from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.
    1) The subarray which is already sorted.
    2) Remaining subarray which is unsorted.  
    In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.`
  },
  { name: 'Merge', message: `Merge Sort is a Divide and Conquer algorithm.
   It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
    The merge() function is used for merging two halves.
     The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.`
  },
  { name: 'Quick', message: `QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.
   There are many different versions of quickSort that pick pivot in different ways.
  Always pick first element as pivot.
  Always pick last element as pivot.
  Pick a random element as pivot.
  Pick median as pivot (implemented below).
  The key process in quickSort is partition().
  Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x)
  before x, and put all greater elements (greater than x) after x. All this should be done in linear time.`
  },
  {
    name: 'Insertion', message: `Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.
     The array is virtually split into a sorted and an unsorted part.
     Values from the unsorted part are picked and placed at the correct position in the sorted part.`
  }

]

export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export const getQ = (x) => {

  switch (x) {
    case 'xs':
      return 5;
    case 'sm':
      return 4.5;
    case 'md':
      return 4;
    case 'lg':
      return 3;
    case 'xl':
      return 2;
    default:
      return 4;
  }

}

export const technologies = [
  { name: 'Java', value: 25, color: '#C33', icon: <DiJava />, type: 'back-end' },
  { name: 'VueJS', value: 14, color: '#42b983', icon: <SiVueDotJs />, type: 'front-end' },
  { name: 'Redux', value: 33, color: '#764abc', icon: <SiRedux />, type: 'front-end' },
  { name: 'RxJS', value: 17, color: '#e01d84', icon: <RxjsIcon />, type: 'front-end' },
  { name: 'Material-UI', value: 40, color: '#1976d2', icon: <SiMaterialUi />, type: 'front-end' },
  { name: 'MongoDB', value: 20, color: '#449837', icon: <SiMongodb />, type: 'database' },
  { name: 'Firebase', value: 24, color: '#ffca28', icon: <SiFirebase />, type: 'back-end, database' },
  { name: 'JavaScript', value: 48, color: '#F0DB4F', icon: <SiJavascript style={{ backgroundColor: '#323330' }} />, type: 'front-end, back-end' },
  { name: 'MySQL', value: 15, color: '#4479a1', icon: <DiMysql />, type: 'database' },
  { name: 'CSS', value: 37, color: 'dodgerblue', icon: <DiCss3 />, type: 'front-end' },
  { name: 'HTML', value: 34, color: '#f06529', icon: <SiHtml5 />, type: 'front-end' },
  { name: 'Bootstrap', value: 31, color: '#7952b3', icon: <SiBootstrap />, type: 'front-end' },
  { name: 'jQuery', value: 16, color: '#b3d4fc', icon: <SiJquery />, type: 'front-end' },
  { name: 'NodeJS', value: 18, color: '#43853d', icon: <SiNodeDotJs />, type: 'back-end' },
  { name: 'ReactJS', value: 43, color: '#30b5de', icon: <DiReact />, type: 'front-end' },
];

//  Fisher-Yates (aka Knuth) Shuffle
export const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const calculateMargin = (widthQ) => {
  switch(widthQ){
    case 5:
        return 2; // 2 x 1px xs screen
    case 4.5:
    case 4:
        return 8; // 2 x 4px sm and md screen
    case 3:
    case 2:
        return 16; // 2 x 8px lg and xl screen
    default:
        return 0;
  }
}
