import {run,runCommand,rover} from "../src/rover"

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
    expect(runCommand(direction, rover(original, [1, 1]))).toEqual(
      rover(expected, [1, 1])
    );
  }
);

test("When moving N,increment y coordinate by 1 keeping x coordinate unchanged", () => {
  expect(runCommand("M", rover("N", [1, 1]))).toEqual(rover("N", [1, 2]));
});

test("When moving E,increment x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(runCommand("M", rover("E", [1, 1]))).toEqual(rover("E", [2, 1]));
});

test("When moving S,decrement y coordinate by 1 keeping x coordinate unchanged", () => {
  expect(runCommand("M", rover("S", [1, 1]))).toEqual(rover("S", [1, 0]));
});

test("When moving W,decrement x coordinate by 1 keeping y coordinate unchanged", () => {
  expect(runCommand("M", rover("W", [1, 1]))).toEqual(rover("W", [0, 1]));
});

test("When executing multiple commands", () => {
  expect(runCommand("LMLMLMLMM", rover("N", [1, 2]))).toEqual(
    rover("N", [1, 3])
  );
});

test("When executing multiple commands", () => {
  expect(runCommand("MMRMMRMRRM", rover("E", [3, 3]))).toEqual(
    rover("E", [5, 1])
  );
});


test("When processing multiple line of inputs", () => {
  const input = ["1 2 N", "LMLMLMLMM"];
  expect(run(input)).toEqual(["1 3 N"]);
});

test("When processing movement of multiple rovers", () => {
  const input = ["1 2 N", "LMLMLMLMM","3 3 E","MMRMMRMRRM"];
  expect(run(input)).toEqual(["1 3 N","5 1 E"]);
});
