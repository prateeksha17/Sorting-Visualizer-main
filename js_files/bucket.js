// Utility function to get the bucket index for a given element
function getBucketIndex(value, numBuckets, minValue, maxValue) {
    return Math.floor(((value - minValue) / (maxValue - minValue)) * (numBuckets - 1));
}

// Utility function to sort an individual bucket using insertion sort
async function insertionSortBucket(bucket, delay) {
    for (let i = 1; i < bucket.length; i++) {
        let key = parseInt(bucket[i].style.height);
        let j = i - 1;

        while (j >= 0 && parseInt(bucket[j].style.height) > key) {
            bucket[j + 1].style.background = 'blue'; // Highlight element being moved
            bucket[j].style.background = 'blue'; // Highlight element being compared
            await waitforme(delay); // Wait for animation
            swap(bucket[j], bucket[j + 1]);
            bucket[j + 1].style.background = '#938ba1'; // Reset color
            bucket[j].style.background = '#938ba1'; // Reset color
            j--;
        }
        bucket[j + 1].style.background = 'blue'; // Highlight inserted element
        await waitforme(delay); // Wait for animation
        bucket[j + 1].style.background = '#938ba1'; // Reset color
    }
}

async function bucketSort() {
    console.log('In bucketSort()');
    const ele = document.querySelectorAll(".bar");
    const n = ele.length;
    if (n <= 1) return;

    const numBuckets = Math.ceil(Math.sqrt(n));
    const minValue = Math.min(...Array.from(ele, e => parseInt(e.style.height)));
    const maxValue = Math.max(...Array.from(ele, e => parseInt(e.style.height)));
    const buckets = Array.from({ length: numBuckets }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < ele.length; i++) {
        const value = parseInt(ele[i].style.height);
        const bucketIndex = getBucketIndex(value, numBuckets, minValue, maxValue);
        buckets[bucketIndex].push(ele[i]);
    }

    // Sort each bucket and concatenate the results
    let index = 0;
    for (const bucket of buckets) {
        await insertionSortBucket(bucket, delay);
        for (const item of bucket) {
            ele[index].style.background = 'blue'; // Highlight sorted element
            await waitforme(delay); // Wait for animation
            swap(ele[index], item); // Move element to correct position
            ele[index].style.background = '#222e50'; // Mark as sorted
            index++;
        }
    }

    // Final coloring for all sorted elements
    for (let k = 0; k < ele.length; k++) {
        ele[k].style.background = '#222e50';
    }
}

const bucketSortbtn = document.querySelector(".bucketSort");
bucketSortbtn.addEventListener('click', async function() {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bucketSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
