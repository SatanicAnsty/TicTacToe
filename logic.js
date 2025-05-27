let players = ["x", "o"];
let activePlayer = 0;
let board = []; // добавляю переменню д/поля

/*------ реализация startGame ------
1. Сбрасывать активного игрока;
2. Создавать пустое поле (массив 3×3);
3. Вызывать renderBoard(board). */

function startGame() {
  activePlayer = 0;

  const size = 3;
  board = [];

  for (let i = 0; i < size; i++) {
    board.push(new Array(size).fill(""));
  }

  renderBoard(board);
}

/*----- реализация click(row, col) ------
1. Проверка: ячейка уже занята — выходим;
2. Ставим метку текущего игрока;
3. Обновляем поле;
4. Проверяем победу;
5. Передаём ход.
 */

function click(row, col) {
  if (board[row][col] !== "") {
    return; // ячейка уже занята
  }

  board[row][col] = players[activePlayer];
  renderBoard(board);

  if (checkWinner(players[activePlayer])) {
    showWinner(activePlayer);
  } else {
    activePlayer = 1 - activePlayer; // переключаем игрока
  }
}

/*----- реализация checkWinner ------
1. Ф-я получает символ игрока и опр-т, есть ли победа:
а) 3 символа подряд в строке;
в) в столбце;
с) по диагонали.
2. Если есть победа -> вернуть true, если нет -> false.
 */

function checkWinner(symbol) {
  const size = board.length; // определяем размер игрового поля

  // проверка по строкам:
  for (let row = 0; row < size; row++) {
    if (board[row].every((cell) => cell === symbol)) return true;
  }

  // проверка по столбцам:
  for (let col = 0; col < size; col++) {
    let win = true;
    for (let row = 0; row < size; row++) {
      if (board[row][col] !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }

  // проверка по 1й диагонали:
   let winDiag1 = true;
  for (let i = 0; i < size; i++) {
    if (board[i][i] !== symbol) {
      winDiag1 = false;
      break;
    }
  }
  if (winDiag1) return true;

  // проверка по 2й диагонали:
  let winDiag2 = true;
  for (let i = 0; i < size; i++) {
    if (board[i][size - 1 - i] !== symbol) {
      winDiag2 = false;
      break;
    }
  }
  if (winDiag2) return true;
  
  return false;
}
