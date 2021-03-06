/**
 * HEAD -> <- NODE -> <- NODE ->  <- NODE -\\
 */

class Node {
  constructor(data = null, previous = null, next = null) {
    this.previous = previous
    this.next = next
    this.data = data
  }
}

class ArrayDoubleLink {
  constructor() {
    this.head = null
    this.count = 0
  }

  push = data => {
    if (this.isEmpty()) {
      this.head = new Node(data)
    } else {
      let node = this.head
      while (node.next !== null) {
        node = node.next
      }
      const newNode = new Node(data, node)
      node.next = newNode
    }
    return ++this.count
  }

  unshift = data => {
    if (this.isEmpty()) {
      this.head = new Node(data)
    } else {
      const newNode = new Node(data, null, this.head)
      this.head.previous = newNode
      this.head = newNode
    }
    return ++this.count
  }

  pop = () => {
    if (this.isEmpty()) {
      return undefined
    }
    let data
    let previous = this.head
    let node = previous.next
    while (node !== null) {
      data = node.data
      previous = node
      node = node.next
    }
    if (this.head === previous) {
      data = this.head.data
      this.head = null
    } else {
      const previousLast = previous.previous
      previousLast.next = null
    }
    --this.count
    return data
  }

  shift = () => {
    if (this.isEmpty()) {
      return undefined
    }
    let data = this.head.data
    this.head = this.head.next
    --this.count
    return data
  }

  isEmpty = () => this.head === null

  reverse = () => {
    const newList = new ArrayDoubleLink()
    const reverseRecursive = node => {
      if (node !== null) {
        newList.unshift(node.data)
        reverseRecursive(node.next)
      }
    }
    reverseRecursive(this.head)
    return newList
  }

  toString = () => {
    if (this.isEmpty()) {
      return '[ ]'
    }
    let node = this.head
    let str = '[ '
    while (node !== null) {
      str = node.next === null
        ? `${str}${node.data}`
        : `${str}${node.data}, `
      node = node.next
    }
    str = `${str} ]`
    return str
  }

  toStringReverse = () => {
    if (this.isEmpty()) {
      return '[ ]'
    }
    const toStrRecursive = node => {
      if (node.next === null) {
        return `[ ${node.data}`
      }
      const str = toStrRecursive(node.next)
      return node.previous !== null
        ? `${str}, ${node.data}`
        : `${str}, ${node.data} ]`
    }
    return toStrRecursive(this.head)
  }
}
