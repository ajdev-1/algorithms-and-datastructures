const heapTypes = Object.freeze({
  'min': 1,
  'max': 2
});

const childPositions = Object.freeze({
  'left': 1,
  'right': 2
});

/**
 * JavaScript implementation of the data structure Heap, using arrays.
 * The heap type (min/ max) can be set with the constructor @parameter type.
 * @type {Int}: 1 for min-heap, 2 for max-heap
 */
class Heap {
  #type;
  #heap;
  #size;

  constructor(type = heapTypes.min, values = []){
    this.#type = type;
    if (values.length > 0) {
      this.build(values);
      this.#size = this.#heap.length - 1;
    } else {
      this.#heap = [null];
    }
    console.log(`Instantiated a ${this.#type}-heap.`);
  }

  /**
   * Core functions: insert, remove, heapify, heapSort
   */
  remove (nodeIndex) {
    if (this.#heap[nodeIndex]) {
      let removedElement;

      if (nodeIndex === this.size) {
        removedElement = this.#heap.pop();
      } else {
        removedElement = this.#heap[nodeIndex];

        const lastElement = this.#heap.pop()

        this.#heap[nodeIndex] = lastElement;

        if (this.size > 1) {
          this.#heapifyNode(nodeIndex);
        }
      }

      return removedElement;
    }

    return `Invalid node index provided: ${nodeIndex}`;
  }

  #heapifyNode = (nodeIndex) => {
    if (this.#invalidParentRelation(nodeIndex) && nodeIndex > 1) {
      this.#heapifyUp(nodeIndex);
    } else if (this.#hasValidChildRelation(nodeIndex) !== true) {
      this.#heapifyDown(nodeIndex);
    }
  }

  sort () {
    let heapLength = this.size;
    for (let nodeIndex=heapLength; nodeIndex>1; nodeIndex--) {
      [this.#heap[1], this.#heap[nodeIndex]] = [this.#heap[nodeIndex], this.#heap[1]];
      this.#size -= 1;
      this.#heapifyNode(1);
    }
  }

  // TO-DO: Do not use heapify on every node.
  build (array) {
    this.#heap = [null, ...array];
    for (let nodeIndex=this.size; nodeIndex>0; nodeIndex--) {
      this.#heapifyNode(nodeIndex);
    }
  }

  insert (numberToInsert) {
    this.#heap.push(numberToInsert);

    if (this.size > 1) {
      const insertedNodeIndex = this.size;
      this.#heapifyNode(insertedNodeIndex);
    }

    console.log(`Inserted number ${numberToInsert}. New size=${this.size}`);
  }

  /**
   * Helper functions that support core functionality.
   */
  #heapifyUp = (nodeIndex) => {
    while (nodeIndex > 1 && this.#invalidParentRelation(nodeIndex)) {
      const parentNodeIndex = this.#getParentIndex(nodeIndex);
      [this.#heap[parentNodeIndex], this.#heap[nodeIndex]] = [this.#heap[nodeIndex], this.#heap[parentNodeIndex]]
      nodeIndex = parentNodeIndex
    }
  }

  #heapifyDown = (nodeIndex) => {
    while (this.#hasValidChildRelation(nodeIndex) !== true) {
      const hasValidChildRelation = this.#hasValidChildRelation(nodeIndex);
      [this.#heap[nodeIndex], this.#heap[hasValidChildRelation]] = [this.#heap[hasValidChildRelation], this.#heap[nodeIndex]]
      nodeIndex = hasValidChildRelation
    }
  }

  // Checks for node - parent relation
  #invalidParentRelation = (nodeIndex) => this.#type === heapTypes.min? this.#isLessThanParent(nodeIndex) : this.#isLargerThanParent(nodeIndex);
  #getParentIndex = (nodeIndex) => Math.floor(nodeIndex/2);
  #isLessThanParent = (nodeIndex) => this.#heap[nodeIndex] < this.#heap[this.#getParentIndex(nodeIndex)];
  #isLargerThanParent = (nodeIndex) => this.#heap[nodeIndex] > this.#heap[this.#getParentIndex(nodeIndex)];

  // Checks for node - children relation
  // TO-DO: check whether left or right child is the largest/ smallest
  #hasValidChildRelation = (nodeIndex) => {
    const leftChildIndex = this.#getChildIndex(nodeIndex, childPositions.left);
    const rightChildIndex = this.#getChildIndex(nodeIndex, childPositions.right);

    if (this.#type === heapTypes.min) {

      if (this.#heap[nodeIndex] > this.#heap[leftChildIndex] &&
        this.#heap[leftChildIndex] <= this.#heap[rightChildIndex]) {
        return leftChildIndex <= this.#size ? leftChildIndex : true;
      } else if (this.#heap[nodeIndex] > this.#heap[rightChildIndex]) {
        return rightChildIndex <= this.#size ? rightChildIndex : true;
      }

    } else if (this.#type === heapTypes.max) {

      if (this.#heap[nodeIndex] < this.#heap[leftChildIndex] &&
        this.#heap[leftChildIndex] >= this.#heap[rightChildIndex]) {
        return leftChildIndex <= this.#size ? leftChildIndex : true;
      } else if (this.#heap[nodeIndex] < this.#heap[rightChildIndex]) {
        return rightChildIndex <= this.#size ? rightChildIndex : true;
      }

    }

    return true;
  };

  #getChildIndex = (nodeIndex, childPosition) => {
    if (childPosition === childPositions.left) {
      return nodeIndex * 2;
    } else if (childPosition === childPositions.right) {
      return nodeIndex * 2 + 1;
    }

    return 'Please provide a valid position.'
  }

  get isEmpty () {
    return this.size === 0;
  }

  get size () {
    return this.#heap.length - 1;
  }

  get type () {
    return this.#type;
  }

  get mostSignificant () {
    if (!this.isEmpty) {
      return this.#heap[1];
    } else {
      return `Heap is empty: ${this.#heap}`;
    }
  }

  get content () {
    return this.#heap;
  }
}

export default Heap;