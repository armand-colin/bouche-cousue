from distutils.log import error
from random import randint, shuffle
from typing import Iterator, List, Tuple

class Sudoku:

    def __init__(self, schema: List[int] = None):
        if schema is None:
            schema = [0] * 81
        self.grid = schema

    def __iter__(self) -> Iterator[int]:
        return self.grid.__iter__()

    def __getitem__(self, i: int or Tuple[int]):
        if type(i) is tuple:
            return self.grid[i[0] * 9 + i[1]]
        return self.grid[i]

    def __setitem__(self, i: int or Tuple[int], v: int):
        if type(i) is tuple:
            self.grid[i[0] * 9 + i[1]] = v
        else:
            self.grid[i] = v

    def is_full(self) -> bool:
        for i in self:
            if i == 0:
                return False
        return True

    def clone(self) -> "Sudoku":
        return Sudoku(self.grid[:])

    def row(self, i: int) -> List[int]:
        return self.grid[i*9:(i+1)*9]

    def col(self, i: int) -> List[int]:
        return [self[n, i] for n in range(9)]

    def square(self, row: int, col: int) -> List[int]:
        row -= row % 3
        col -= col % 3
        return [self[row + r, col + c] for r in range(3) for c in range(3)]

    def valid(self, i: int, value: int) -> bool:
        row = i//9
        col = i % 9
        if value in self.row(row):
            return False
        if value in self.col(col):
            return False
        if value in self.square(row, col):
            return False
        return True

    def hash(self):
        return "".join(map(lambda x: str(x), self.grid))

    @staticmethod
    def solve(sudoku: "Sudoku") -> int:
        solutions = []

        # Find next empty cell
        for i in range(0, 81):

            if sudoku[i] != 0:
                continue

            for value in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
                if not sudoku.valid(i, value):
                    continue

                sudoku[i] = value

                if sudoku.is_full():
                    solutions.append(sudoku.hash())
                    return solutions

                solutions += Sudoku.solve(sudoku)

                sudoku[i] = 0

            break

        return solutions

    @staticmethod
    def fill(sudoku: "Sudoku") -> bool:
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        shuffle(numbers)

        for i in range(81):

            if sudoku[i] != 0:
                continue

            for value in numbers:

                if not sudoku.valid(i, value):
                    continue

                sudoku[i] = value

                if sudoku.is_full():
                    return True
                
                if Sudoku.fill(sudoku):
                    return True

                sudoku[i] = 0

            break

        return False

    @staticmethod
    def generate() -> "Sudoku":
        sudoku = Sudoku()

        if not Sudoku.fill(sudoku):
            error("Generate failed")
        
        attempts = 5

        while attempts > 0:
            i = randint(0, 80)
            while sudoku[i] == 0:
                i = randint(0, 80)

            backup = sudoku[i]
            sudoku[i] = 0

            copy = sudoku.clone()

            solutions = Sudoku.solve(copy)

            if len(solutions) > 1:
                sudoku[i] = backup
                attempts -= 1
        
        return sudoku


if __name__ == "__main__":

    hashes = []

    print("Generating...")
    for i in range(10):
        sudoku = Sudoku.generate()
        hashes.append(sudoku.hash())

    print("Writing...")
    with open("list-grids.json", "w") as file:
        file.write("[" + ",".join(map(lambda x: f'"{x}"', hashes)) + "]")

    print("Done")