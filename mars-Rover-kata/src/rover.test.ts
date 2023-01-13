type Heading = "N" | "W" | "S" | "E";
type Coordinates = [x: number, y: number];
type RoverState = { heading: Heading; position: Coordinates };
const direction: Array<Heading> = ["N", "E", "S", "W"];

const rover = (heading: Heading, position: Coordinates): RoverState => ({
  heading,
  position:position || startPosition(),
});
const startPosition = () => [1, 1];

const getMovedPosition = (heading:Heading,position:Coordinates):Coordinates=> {
  const [x, y] = position;
  if (heading === "N") return [x, y + 1];
  if (heading === "E") return [x + 1, y];
  if (heading === "S") return [x, y - 1];
  if (heading === "W") return [x - 1, y];
  else return position;
};

const move=(rover:RoverState) =>({
  ...rover,position:getMovedPosition(rover.heading,rover.position)})

const spin = (turns: number) => (rover:RoverState) => {
  const index = direction.indexOf(rover.heading);
  const newHeading= direction[(index + turns) % 4];
  return {...rover,heading:newHeading}
};

export const act = (command: string, state: RoverState):RoverState => {
  if (command === "L") return turnLeft(state);
  if (command === "R") return turnRight(state);
  if (command === "M") return move(state);
  else return state ;
};

const runCommand=(commands:string,state:RoverState)=>
{
let finalRover=state;
for(const command of commands.split(''))
finalRover= act(command,finalRover)
return finalRover;
}
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

test("When executing multiple commands", () => {
  expect(runCommand("LMLMLMLMM", rover("N",[1,2]))).toEqual(rover("N",[1,3]));
});
