import { isoLines } from 'marchingsquares';

onmessage = function({ data }) {
  // data should be the right type
  
  let line_pos = isoLines(data[0], data[1]);
  postMessage(line_pos);
}

const line_from = (n, res, x, y) => {
  let a = [x + (res.x / 2), y];
  let b = [x + res.x, y + res.y / 2];
  let c = [x + res.x / 2, y + res.y];
  let d = [x, y + res.y/2]
  switch (n) {
    case 0:
      return [[]];
    case 1:
      return [[b, c]];
    case 2:
      return [[c, d]];
    case 3:
      return [[b, d]];
    case 4:
      return [[a, b]];
    case 5:
      return [[a, c]];
    case 6:
      return [[d, a], [b, c]];
    case 7:
      return [[a, d]];
    case 8:
      return [[a, d]];
    case 9: 
      return [[a, b], [c, d]];
    case 10:
      return [[a, c]];
    case 11:
      return [[a, b]];
    case 12:
      return [[d, b]];
    case 13:
      return [[c ,d]];
    case 14:
      return [[b, c]];
    case 15:
      return [[]];
  }
}

const state = (grid, threshold, i, j) => { 
  let a = grid[i][j] > threshold ? 8 : 0;
  let b = grid[i][j+1]   > threshold ? 4 : 0;
  let c = grid[i+1][j]   > threshold ? 2 : 0;
  let d = grid[i+1][j+1] > threshold ? 1 : 0;

  return a | b | c | d;
}

export function marching_squares({ grid, res, threshold }) {
  let ret = []
  let n;
  for (let i = 0; i < grid.length-1; i++) {
    for (let j = 0; j < grid[i].length-1; j++) {
      var x = j * res.x;
      var y = i * res.y;

      n = state(grid, threshold, i, j);
      
      ret.push(line_from(n, res, x, y));
    }
  }

  return ret;
}


