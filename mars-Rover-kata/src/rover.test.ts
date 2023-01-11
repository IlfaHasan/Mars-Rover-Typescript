type Heading = "N" | "W" | "S" | "E";
type Coordinates = [x: number, y: number];
type RoverState = { heading: Heading; position: Coordinates };
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

const act = (command: string, state: RoverState) => {
  if (command === "L") return { ...state, heading: turnLeft(state.heading) };
  if (command === "R") return { ...state, heading: turnRight(state.heading) };
  if (command === "M") return { ...state, position: moveRover(state.heading,state.position) };
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
    const initialState: RoverState = { heading: original, position: [1, 1] };
    expect(act(direction, initialState)).toEqual({
      ...initialState,
      heading: expected,
    });
  }
);


test("When moving N,increment y coordinate by 1 keeping x coordinate unchanged", () => {
  const initialState: RoverState = { heading: "N", position: [1, 1] };
    expect(act("M", initialState)).toEqual({
      ...initialState,
      position: [1,2],
    });
});

test("When moving E,increment x coordinate by 1 keeping y coordinate unchanged", () => {
  const initialState: RoverState = { heading: "E", position: [1, 1] };
    expect(act("M", initialState)).toEqual({
      ...initialState,
      position: [2,1],
    });
});

test("When moving S,decrement y coordinate by 1 keeping x coordinate unchanged", () => {
  const initialState: RoverState = { heading: "S", position: [1, 1] };
    expect(act("M", initialState)).toEqual({
      ...initialState,
      position: [1,0],
    });
});

test("When moving W,decrement x coordinate by 1 keeping y coordinate unchanged", () => {
  const initialState: RoverState = { heading: "W", position: [1, 1] };
    expect(act("M", initialState)).toEqual({
      ...initialState,
      position: [0,1],
    });
});
