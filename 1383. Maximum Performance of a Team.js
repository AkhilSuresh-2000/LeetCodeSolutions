var maxPerformance = function (n, speed, efficiency, k) {

    let engineers = [];


    for (let i = 0; i < n; i++) {

        engineers.push([speed[i], efficiency[i]]);
    }

    //sorting  the array 
    engineers.sort((a, b) => b[1] - a[1]);
    let minHeap = new MinHeap();
    let speedSum = 0;
    let minEfficiency;
    let result = 0;
    for (let i = 0; i < n; i++) {
        minEfficiency = engineers[i][1];
        speedSum = BigInt(speedSum) + BigInt(engineers[i][0]);
        minHeap.insert(BigInt(engineers[i][0]));
        if (minHeap.size() > k) speedSum -= minHeap.delete();
        let tmp = BigInt(minEfficiency) * BigInt(speedSum);
        result = tmp > result ? tmp : result;
    }

    return result % 1000000007n;

}

function MinHeap() {

    this.heap = [-Infinity];
}


MinHeap.prototype.insert = function (x) {

    this.heap.length++;
    let child = this.heap.length - 1;
    let parent = parseInt(child / 2);
    while (this.heap[parent] > x) {
        this.heap[child] = this.heap[parent];
        child = parent;
        parent = parseInt(child / 2);
    }
    this.heap[child] = x;
}
MinHeap.prototype.delete = function () {
    let size = this.size();
    if (size <= 0) return
    let result = this.heap[1];
    let item = this.heap[size];
    this.heap.length--;
    size--;
    let parent, child
    for (parent = 1; parent * 2 <= size; parent = child) {
        child = parent * 2;
        if (child + 1 <= size && this.heap[child + 1] < this.heap[child])
            child = child + 1;
        if (item < this.heap[child]) break
        this.heap[parent] = this.heap[child];
    }
    this.heap[parent] = item;
    return result;
}
MinHeap.prototype.size = function () {
    return this.heap.length - 1;
}
console.log(maxPerformance(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 4));