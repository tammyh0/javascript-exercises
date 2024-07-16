const GRID_LENGTH = 800;

function createGrid() {
  const INITIAL_SQUARE_LENGTH_PX = 200;

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#grid-container');

    insertSquares(container, INITIAL_SQUARE_LENGTH_PX);

    const btn = document.querySelector('#btn');
    btn.addEventListener('click', () => {
      let numSquares = prompt('How many squares in per side your new grid?');
      if (numSquares >= 1 && numSquares <= 100) {
        document.querySelectorAll('.square').forEach((item) => item.remove());
        const squareLengthPx = GRID_LENGTH / numSquares;
        insertSquares(container, squareLengthPx);
      } else {
        alert('You must input a number between 1 and 100!');
      }
    });
  });
}

function insertSquares(container, size) {
  const count = Math.pow(GRID_LENGTH / size, 2);
  for (let i = 0; i < count; i++) {
    // Create square
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    square.style.opacity = "0.1";
    square.addEventListener('mouseover', (event) => {
      square.classList.add('color');
      console.log(window.getComputedStyle(square).opacity)
      square.style.opacity = `${Number(window.getComputedStyle(square).opacity) + 0.2}`;
      console.log(window.getComputedStyle(square).opacity)
    });

    container.appendChild(square);
  }
}

createGrid();
