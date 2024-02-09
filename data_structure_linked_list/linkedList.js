/**
 * Represents a node in a singly linked list.
 * @class
 */
class Node {
  /**
   * Create a node.
   * @constructor
   * @param {*} data - The data to be stored in the node.
   */
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Represents a singly linked list.
 * @class
 */
class LinkedList {
  /**
   * Create an empty linked list.
   * @constructor
   */
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Adds a new node with the specified data at the end of the linked list.
   * @param {*} data - The data to be stored in the new node.
   */
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  /**
   * Inserts a new node with the specified data at the specified index in the linked list.
   * @param {number} index - The index at which to insert the new node.
   * @param {*} data - The data to be stored in the new node.
   * @returns {boolean} - true if the node was inserted successfully, false otherwise.
   */
  insertAt(index, data) {
    if (index < 0 || index > this.size) {
      return false;
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let count = 0;
      while (count < index - 1) {
        current = current.next;
        count++;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
    this.size++;
    return true;
  }

  /**
   * Removes the node at the specified index from the linked list.
   * @param {number} index - The index of the node to be removed.
   * @returns {*} - The data of the removed node, or null if the index is invalid.
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let removedData;
    if (index === 0) {
      removedData = this.head.data;
      this.head = this.head.next;
    } else {
      let current = this.head;
      let count = 0;
      while (count < index - 1) {
        current = current.next;
        count++;
      }
      removedData = current.next.data;
      current.next = current.next.next;
    }
    this.size--;
    return removedData;
  }

  /**
   * Returns the data of the node at the specified index in the linked list.
   * @param {number} index - The index of the node.
   * @returns {*} - The data of the node at the specified index, or null if the index is invalid.
   */
  get(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current.data;
  }

  /**
   * Prints the data of all nodes in the linked list.
   */
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const linkedList = new LinkedList();
linkedList.add(5);
linkedList.add(10);
linkedList.add(3);
linkedList.print();
