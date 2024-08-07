async function heapify(ele, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    ele[i].style.background = 'yellow'; // Highlight the root
    if (left < n && parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)) {
        largest = left;
    }
    if (right < n && parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        ele[i].style.background = 'orange'; // Highlight the element being swapped
        ele[largest].style.background = 'orange'; // Highlight the element being swapped

        await waitforme(delay); // Wait for animation to finish
        swap(ele[i], ele[largest]);

        // Recursively heapify the affected subtree
        await heapify(ele, n, largest);
    }

    ele[i].style.background = '#938ba1'; // Reset color
}

async function heapSort() {
    stopSorting = false;
    const ele = document.querySelectorAll(".bar");
    let n = ele.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopSorting) return;
        await heapify(ele, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        ele[0].style.background = 'blue'; // Highlight root element
        ele[i].style.background = 'blue'; // Highlight last element

        await waitforme(delay); // Wait for animation to finish
        swap(ele[0], ele[i]); // Move current root to the end

        ele[i].style.background = '#222e50'; // Mark the element as sorted

        await heapify(ele, i, 0); // Heapify the reduced heap
    }

    // Final coloring for all sorted elements
    for (let k = 0; k < ele.length; k++) {
        ele[k].style.background = '#222e50';
    }
}

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener('click', async function() {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await heapSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
