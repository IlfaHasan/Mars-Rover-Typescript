type Heading = "N" | "W" | "S" | "E";
type Coordinates = [x: number, y: number];
const direction: Array<Heading> = ["N", "E", "S", "W"];

const moveRover = (heading: Heading, position: Coordinates) => {
  const [x, y] = position;
  if (heading === "N") return [x, y + 1];
  if (heading === "E") return [x + 1, y];
  if (heading === "S") return [x, y - 1];
  if (heading === "W") return [x - 1, y];
};


const spin =(turns:number)=>(heading:Heading)=>
{
    const index = direction.indexOf(heading);
  return direction[(index + turns) % 4];

}
//turnLeft
const turnLeft = spin(3);
  

//turnRight
const turnRight = spin(1);

test.each`
  original | expected
  ${"N"} | ${"W"}
  ${"W"} | ${"S"}
  ${"S"} | ${"E"}
  ${"E"} | ${"N"}
`('returns facing $original turnRight should face the rover to $expected', ({original, expected}) => expect(turnLeft(original)).toBe(expected)
);

//turnRight
test("When facing N,turn right should face the Rover W", () => {
  expect(turnRight("N")).toBe("E");
});
test("When facing W,turn right should face the Rover S", () => {
  expect(turnRight("E")).toBe("S");
});
test("When facing S,turn right should face the Rover E", () => {
  expect(turnRight("S")).toBe("W");
});
test("When facing E,turn right should face the Rover N", () => {
  expect(turnRight("W")).toBe("N");
});

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
