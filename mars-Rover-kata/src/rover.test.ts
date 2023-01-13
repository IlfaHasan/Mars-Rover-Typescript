import {run,runCommand,rover} from "../src/rover"


test("When processing movement of multiple rovers", () => {
  const input = ["5 5","1 2 N", "LMLMLMLMM","3 3 E","MMRMMRMRRM"];
  expect(run(input)).toEqual(["1 3 N","5 1 E"]);
});