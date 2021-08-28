/// TODOS: Add css to the dragging element on 'dragstart' and 'dragend'
/// Calculate which container the new element is getting dropped to using 'dragover'
/// Calculate the position of the dragging element in the new container

const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', ()=>{
        console.log('dragstart');
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', ()=>{
        console.log('dragend');
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e =>{
        e.preventDefault();
        const draggable = document.querySelector('.dragging');

        const afterElement = getDragAfterElement(container, e.clientY).element;
        if(afterElement == null){ // if afterElement is null add to last
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
});

function getDragAfterElement(container, y){
    // will only return elements that have draggable and not dragging class
   const draggableElementsNotArray = container.querySelectorAll('.draggable:not(.dragging)');
   const draggableElements = [...draggableElementsNotArray]; // as querySelectorAll does not return us an array

    return draggableElements.reduce((closest, child) => {
       const box = child.getBoundingClientRect(); // gives a box for the child => gives : x, y, width, height, top, right, bottom, left
       const offset = y - box.top - (box.height / 2) ; // distance between the center of a box and actual mouse position
                        // when above an element returns -ve and when below returns +ve.
        if(offset < 0 && offset > closest.offset) // we want a -ve offset which is closest to 0. coz we are nearest to that offset.
        {
            return {offset: offset, element: child}
        } else { // if this current draggable is not closest return the default closest.
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}); /// the starting number is least possible number, so that any offset is initially greater than default offset.
                                            /// passed as '{offset: Number.NEGATIVE_INFINITY}'
}



///// The reducer walks through the array element-by-element, 
///// at each step compares the current lowest value to the result 
///// from the previous step (this result is the running lowest of all the previous steps) — 
///// until there are no more elements to add.

//// Example of reduce
// function myFunc(lowest, num) {
//     return lowest  > num ? num : lowest;
// }

// const numbers = [175, 50, 67];
// numbers.reduce(myFunc); // 50