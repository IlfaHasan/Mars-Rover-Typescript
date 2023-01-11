type Heading = "N" | "W" | "S" | "E";
type Coordinates = [x: number, y: number];
type Rover = { heading: Heading; position: Coordinates };
const direction: Array<Heading> = ["N", "E", "S", "W"];

const moveRover = (heading: Heading, position: Coordinates) => {
  const [x, y] = position;
  if (heading === "N") return [x, y + 1];
  if (heading === "E") return [x + 1, y];
  if (heading === "S") return [x, y - 1];
  if (heading === "W") return [x - 1, y];
};

const spin = (turns: number) => (heading: Heading) => {
  const index = direction.indexOf(heading);
  return direction[(index + turns) % 4];
};

const act = (command: string, state: Rover) => {
  if (command === "L") return { ...state, heading: turnLeft(state.heading) };
  if (command === "R") return { ...state, heading: turnRight(state.heading) };
};
//turnLeft
const turnLeft = spin(3);

//turnRight
const turnRight = spin(1);

/*test.each`
  original | expected
  ${"N"} | ${"W"}
  ${"W"} | ${"S"}
  ${"S"} | ${"E"}
  ${"E"} | ${"N"}
`('returns facing $original turnLeft should face the rover to $expected', ({original, expected}) => expect(turnLeft(original)).toBe(expected)
);*/

/*test.each`
  original | expected
  ${"N"}   | ${"E"}
  ${"E"}   | ${"S"}
  ${"S"}   | ${"W"}
  ${"W"}   | ${"N"}
`(
  "returns facing $original turnRight should face the rover to $expected",
  ({ original, expected }) => expect(turnRight(original)).toBe(expected)
);*/

test.each`
  original | expected
  ${"N"}   | ${"E"}
  ${"E"}   | ${"S"}
  ${"S"}   | ${"W"}
  ${"W"}   | ${"N"}
`(
  "returns facing $original turnRight should face the rover to $expected",
  ({ original, expected }) => {
    const initialState: Rover = { heading: original, position: [1, 1] };
    expect(act("R", initialState)).toEqual({
      ...initialState,
      heading: expected,
    });
  }
);

test.each`
  original | expected
  ${"N"}   | ${"W"}
  ${"W"}   | ${"S"}
  ${"S"}   | ${"E"}
  ${"E"}   | ${"N"}
`(
  "returns facing $original turnLeft should face the rover to $expected",
  ({ original, expected }) => {
    const initialState: Rover = { heading: original, position: [1, 1] };
    expect(act("L", initialState)).toEqual({
      ...initialState,
      heading: expected,
    });
  }
);

test("When moving N,increment y coordinate by 1 keeping x coordinate unchanged", () => {
  expect(moveRover("N", [1, 1])).toEqual([1, 2]);
});
test("When moving E,increment x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(moveRover("E", [1, 1])).toEqual([2, 1]);
});
test("When moving S,decrement y coordinate by 1 keeping x coordinate unchanged", () => {
  expect(moveRover("S", [1, 1])).toEqual([1, 0]);
});
test("When moving W,decrement x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(moveRover("W", [1, 1])).toEqual([0, 1]);
});
