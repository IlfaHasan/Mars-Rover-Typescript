const turnLeft=(x:string)=> "W";

test("When facing N,turn left should face the Rover W",()=>{
    expect(turnLeft("N")).toBe("W");
})