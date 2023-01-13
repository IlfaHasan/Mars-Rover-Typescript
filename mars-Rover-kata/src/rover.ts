type Heading = "N" | "W" | "S" | "E" | string;
type Coordinates = [x: number, y: number];
type RoverState = { heading: Heading; position: Coordinates };
const direction: Array<Heading> = ["N", "E", "S", "W"];

export const rover = (heading: Heading, position: Coordinates): RoverState => ({
  heading,
  position: position,
});
const startPosition = () => [1, 1];

const getMovedPosition = (
  heading: Heading,
  position: Coordinates
): Coordinates => {
  const [x, y] = position;
  if (heading === "N") return [x, y + 1];
  if (heading === "E") return [x + 1, y];
  if (heading === "S") return [x, y - 1];
  if (heading === "W") return [x - 1, y];
  else return position;
};

const move = (rover: RoverState) => ({
  ...rover,
  position: getMovedPosition(rover.heading, rover.position),
});

const spin = (turns: number) => (rover: RoverState) => {
  const index = direction.indexOf(rover.heading);
  const newHeading = direction[(index + turns) % 4];
  return { ...rover, heading: newHeading };
};

export const act = (state: RoverState, command: string): RoverState => {
  if (command === "L") return turnLeft(state);
  if (command === "R") return turnRight(state);
  if (command === "M") return move(state);
  else return state;
};

export const runCommand = (commands: string, state: RoverState) =>
  commands.split("").reduce(act, state);
//turnLeft
const turnLeft = spin(3);

//turnRight
const turnRight = spin(1);


const initialState = (location: string) => {
 
  const [x, y, heading] = location.split(" ");
  return rover(heading, [parseInt(x), parseInt(y)]);
};

const print = (state: RoverState) => `${state.position[0]} ${state.position[1]} ${state.heading}`;

export const run = (input: Array<string>): Array<string> => {
  const output=[];
  while(input.length>0)
  {
    const [location, commands]= [input.shift(),input.shift()];
    const state=runCommand(commands, initialState(location));
    output.push(print(state));
  }
  
  return output;
};

