// Linear Search O(n)

const array = [1,4,5,8,5,1,2,7,5,2,11]
let count = 0
function linearSearch(array, item) {
    for (let i = 0; i < array.length; i++) {
        count += 1
        if (array[i] === item) {
            return i;
        }
    }
    return null
}

console.log(linearSearch(array, 11))
console.log('count = ', count)


export default class BloomFilter {
    /**
     * @param {number} size - the size of the storage.
     */
    constructor(size = 100) {
      // Bloom filter size directly affects the likelihood of false positives.
      // The bigger the size the lower the likelihood of false positives.
      this.size = size;
      this.storage = this.createStore(size);
    }
  
    /**
     * @param {string} item
     */
    insert(item) {
      const hashValues = this.getHashValues(item);
  
      // Set each hashValue index to true.
      hashValues.forEach((val) => this.storage.setValue(val));
    }
  
    /**
     * @param {string} item
     * @return {boolean}
     */
    mayContain(item) {
      const hashValues = this.getHashValues(item);
  
      for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
        if (!this.storage.getValue(hashValues[hashIndex])) {
          // We know that the item was definitely not inserted.
          return false;
        }
      }
  