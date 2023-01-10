const turnLeft = (x: string) => {
  switch (x) {
    case "N":
      return "W";
    case "W":
      return "S";
    case "S":
      return "E";
    case "E":
      return "N";
  }
};

const turnRight = (x: string) => {
    switch (x) {
      case "N":
        return "E";
      case "E":
        return "S";
      case "S":
        return "W";
      case "W":
        return "N";
    }
  };

//turnLeft
test("When facing N,turn left should face the Rover W", () => {
    expect(turnLeft("N")).toBe("W");
  });
  test("When facing W,turn left should face the Rover S", () => {
    expect(turnLeft("W")).toBe("S");
  });
  test("When facing S,turn left should face the Rover E", () => {
    expect(turnLeft("S")).toBe("E");
  });
  test("When facing E,turn left should face the Rover N", () => {
    expect(turnLeft("E")).toBe("N");
  });

//turnRight
  test("When facing N,turn left should face the Rover W", () => {
    expect(turnRight("N")).toBe("E");
  });
  test("When facing W,turn left should face the Rover S", () => {
    expect(turnRight("E")).toBe("S");
  });
  test("When facing S,turn left should face the Rover E", () => {
    expect(turnRight("S")).toBe("W");
  });
  test("When facing E,turn left should face the Rover N", () => {
    expect(turnRight("W")).toBe("N");
  });
