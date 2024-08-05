// Utility function to get the digit at a specific place value
function getDigit(number, place) {
    return Math.floor(number / place) % 10;
}

// Utility function to perform counting sort based on a specific digit
async function countingSortByDigit(ele, place) {
    const n = ele.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        const digit = getDigit(parseInt(ele[i].style.height), place);
        count[digit]++;
    }

    // Update count array to hold positions
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Place elements into the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = getDigit(parseInt(ele[i].style.height), place);
        const position = count[digit] - 1;
        output[position] = ele[i];
        count[digit]--;
    }

    // Animate the sorting process
    for (let i = 0; i < n; i++) {
        ele[i].style.background = 'blue'; // Highlight current element
        await waitforme(delay); // Wait for animation
        swap(ele[i], output[i]); // Swap elements
        ele[i].style.background = '#222e50'; // Mark as sorted
    }
}

async function radixSort() {
    console.log('In radixSort()');
    const ele = document.querySelectorAll(".bar");
    const max = Math.max(...Array.from(ele, e => parseInt(e.style.height)));
    let place = 1;

    // Perform counting sort for each digit
    while (Math.floor(max / place) > 0) {
        await countingSortByDigit(ele, place);
        place *= 10; // Move to the next digit place
    }

    // Final coloring for all sorted elements
    for (let k = 0; k < ele.length; k++) {
        ele[k].style.background = '#222e50';
    }
}

const radixSortbtn = document.querySelector(".radixSort");
radixSortbtn.addEventListener('click', async function() {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await radixSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
