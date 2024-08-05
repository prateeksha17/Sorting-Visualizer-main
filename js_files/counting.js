async function countingSort() {
    console.log('In countingSort()');
    const ele = document.querySelectorAll(".bar");
    const n = ele.length;

    if (n <= 1) return;

    // Extract heights and determine min and max values
    const heights = Array.from(ele, e => parseInt(e.style.height));
    const min = Math.min(...heights);
    const max = Math.max(...heights);
    
    console.log('Heights:', heights);
    console.log('Min:', min, 'Max:', max);

    // Initialize count array
    const count = new Array(max - min + 1).fill(0);
    const output = new Array(n);

    // Count occurrences of each height
    for (let i = 0; i < n; i++) {
        count[heights[i] - min]++;
    }

    console.log('Count array:', count);

    // Compute cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    console.log('Cumulative count array:', count);

    // Place elements in output array
    for (let i = n - 1; i >= 0; i--) {
        const value = heights[i];
        const index = count[value - min] - 1;
        output[index] = ele[i];
        count[value - min]--;
    }

    console.log('Output array:', output);

    // Animate the sorting process
    for (let i = 0; i < n; i++) {
        ele[i].style.background = 'blue'; // Highlight current element
        await waitforme(delay); // Wait for animation
        swap(ele[i], output[i]); // Swap elements
        ele[i].style.background = '#222e50'; // Mark as sorted
    }

    // Final coloring for all sorted elements
    for (let k = 0; k < n; k++) {
        ele[k].style.background = '#222e50';
    }
}

const countSortbtn = document.querySelector(".countingSort");
countSortbtn.addEventListener('click', async function() {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await countingSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
