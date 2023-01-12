type Heading = "N" | "W" | "S" | "E";
type Coordinates = [x: number, y: number];
type RoverState = { heading: Heading; position: Coordinates };
const direction: Array<Heading> = ["N", "E", "S", "W"];

const rover = (heading: Heading, position: Coordinates): RoverState => ({
  heading,
  position:position || startPosition(),
});
const startPosition = () => [1, 1];

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

export const act = (command: string, state: RoverState) => {
  if (command === "L") return { ...state, heading: turnLeft(state.heading) };
  if (command === "R") return { ...state, heading: turnRight(state.heading) };
  if (command === "M")
    return { ...state, position: moveRover(state.heading, state.position) };
};
//turnLeft
const turnLeft = spin(3);

//turnRight
const turnRight = spin(1);



test.each`
  original | expected | direction
  ${"N"}   | ${"E"}   | ${"R"}
  ${"E"}   | ${"S"}   | ${"R"}
  ${"S"}   | ${"W"}   | ${"R"}
  ${"W"}   | ${"N"}   | ${"R"}
  ${"N"}   | ${"W"}   | ${"L"}
  ${"W"}   | ${"S"}   | ${"L"}
  ${"S"}   | ${"E"}   | ${"L"}
  ${"E"}   | ${"N"}   | ${"L"}
`(
  "facing $original and the command given should face the rover to $expected",
  ({ original, expected, direction }) => {
        expect(act(direction, rover(original,[1,1]))).toEqual(rover(expected,[1,1]));
  }
);

test("When moving N,increment y coordinate by 1 keeping x coordinate unchanged", () => {
    expect(act("M", rover("N",[1,1]))).toEqual(rover("N",[1,2]));
});

test("When moving E,increment x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(act("M", rover("E",[1,1]))).toEqual(rover("E",[2,1]));
});

test("When moving S,decrement y coordinate by 1 keeping x coordinate unchanged", () => {
  expect(act("M", rover("S",[1,1]))).toEqual(rover("S",[1,0]));
});

test("When moving W,decrement x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(act("M", rover("W",[1,1]))).toEqual(rover("W",[0,1]));
});
