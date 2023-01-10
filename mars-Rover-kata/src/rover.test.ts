const turnLeft=(x:string)=>{
    if(x==="N") return "W";
    if(x==="W") return "S";
    if(x==="S") return "E";
    return "N"
}

test("When facing N,turn left should face the Rover W",()=>{
    expect(turnLeft("N")).toBe("W");
})
test("When facing W,turn left should face the Rover S",()=>{
    expect(turnLeft("W")).toBe("S");
})
test("When facing S,turn left should face the Rover E",()=>{
    expect(turnLeft("S")).toBe("E");
})
test("When facing E,turn left should face the Rover N",()=>{
    expect(turnLeft("E")).toBe("N");
})