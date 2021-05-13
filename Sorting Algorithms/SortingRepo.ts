class SortingRepo {

  constructor () {
    const arr: Array<number> = [0, 8, 1, 6, 9];
    const res = this.bubbleSort(arr);
    console.log(res);
    console.log('Successfully instantiated a SortingRepo.');
  }

  /**
   * Implementation of the bubble sort algorithm.
   * This one uses a slow + fast runner paradigm which compares every element with every
   * other element in the array.
   * 
   * @param arr: The array you want to sort.
   * @returns The sorted array, ascending.
   */
  public bubbleSort (arr: Array<number>): Array<number> {
    for (let slowRunner = 0; slowRunner < arr.length; slowRunner++) {
      for (let fastRunner = 0; fastRunner < arr.length; fastRunner++) {
        const itemToCompare = arr[slowRunner];
        const oneOfTheOtherItems = arr[fastRunner];
        
        if (itemToCompare < oneOfTheOtherItems) {
          this.swap(arr, slowRunner, fastRunner);
        }
      }
    }

    return arr;
  }

  /**
   * Improved implementation of the bubble sort algorithm. This version checks
   * if a swap has been made during an interation. If not the algorithm is finished
   * since the array is sorted at that point.
   * 
   * @param arr: The array you want to sort.
   * @returns The sorted array, ascending.
   */
  public bubbleSortImproved (arr: Array<number>): Array<number> {
    let unsortedArrayLength = arr.length - 1;

    do {
      var swapped = false;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
          this.swap(arr, i, i + 1);
          swapped = true;
        }
      }

      unsortedArrayLength -= 1;
    } while (swapped);
    
    return arr;
  }

  /**
   * Implementation of the quick sort algorithm.
   * Recursive algorithm that uses the partition function to place a pivot element after
   * all elements that are less than the pivot and in front of all elements that are larger
   * than the pivot element.
   * The last element is being picked as the pivot element.
   * 
   * @param arr: The array you want to sort
   * @param start: The first index of the to-sort-part of the array.
   * @param end: The ending index of the to-sort-part of the array.
   * @returns The sorted array, ascending.
   */
  public quickSort(arr: Array<number>, start: number, end: number): Array<number> {
    if (start > end) return;
    
    let pivotIndex: number = this.partition(arr, start, end);
    this.quickSort(arr, start, pivotIndex - 1);
    this.quickSort(arr, pivotIndex + 1, end);

    return arr;
  }

  private partition(arr: Array<number>, start: number, end: number): number {
    let pivotIndex = start;
    const pivotValue = arr[end];

    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        this.swap(arr, i, pivotIndex);
        pivotIndex += 1; 
      }
    }

    this.swap(arr, pivotIndex, end);

    return pivotIndex;
  }

  // Helper functions
  private swap (arr: Array<number>, a: number, b: number): Array<number> {
    if (a === b) return arr;

    const tmp: any = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;

    return arr;
  }

}

export default new SortingRepo();