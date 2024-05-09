$(document).ready(function () {
  $("td, th").css("padding", "30px");
  let obstacles = [];
  $(".res").css("background-color", "greenyellow");

  $("th, td").hover(function () {
    const cellId = $(this).attr("id");

    obstacles.push(parseInt(cellId));
    console.log("Obstacles:", obstacles);

    obstacles.map((value) => {
      $(`#${value}`).css("background-color", "red");
    });
  });

  $(".reset").click(() => {
    location.reload();
  });

  $(".start").click(function () {
    console.log(obstacles);

    let numRows = 9;
    let numCols = 9;

    function isValid(row, col) {
      console.log(row, col);

      const cellNumber = row * numCols + col + 1;

      if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
        return false;
      }

      return !obstacles.includes(cellNumber);
    }

    function getNeighbors(row, col) {
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      const neighbors = [];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (isValid(newRow, newCol)) {
          neighbors.push([newRow, newCol]);
        }
      }
      return neighbors;
    }

    function shortestPath() {
      const queue = [[0]]; // Starting from cell 1
      const visited = new Set();

      while (queue.length > 0) {
        const currentPath = queue.shift();
        const lastCell = currentPath[currentPath.length - 1];
        const row = Math.floor(lastCell / numCols);
        const col = lastCell % numCols;
        if (row === numRows - 1 && col === numCols - 1) {
          return currentPath;
        }

        visited.add(lastCell);
        for (const [neighborRow, neighborCol] of getNeighbors(row, col)) {
          const neighborCell = neighborRow * numCols + neighborCol;
          if (!visited.has(neighborCell)) {
            const newPath = currentPath.slice(); // Create a copy of current path
            newPath.push(neighborCell);
            queue.push(newPath);
          }
        }
      }

      return [];
    }

    const path = shortestPath();

    if (path.length === 0) {
      $(".output").append(`<p><b>Error: </b>No Path Found../</p>`);
    } else {
      path.forEach((cell, index) => {
        setTimeout(() => {
          $(".output").append(
            `<p>Traversing via Cell ${cell}. visiting Index ${index}</p>`
          );
          $(`#${cell + 1}`).css("background-color", "yellow");
        }, index * 150);
      });
      $(".output").append(`<p><b>Success: </b>Execution Completed, Path Found</p>`);
      $(".output").append(`<p>/ Unpackaging...</p>`);
    }
  });
});
