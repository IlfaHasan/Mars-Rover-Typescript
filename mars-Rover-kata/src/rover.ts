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


