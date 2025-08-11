const express = reqire('express');
const app = express();
const port = 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


function parseBaseToInteger(str,base){
  const b = BigInt(base);
  let s = str.trim().toLowerCase();

  let val = 0n;

  for(let ch of s){
    let digit;
     if (ch >= '0' && ch <= '9') digit = BigInt(ch.charCodeAt(0) - '0'.charCodeAt(0));
     else if (ch >= 'a' && ch <= 'z') digit = BigInt(10 + ch.charCodeAt(0) - 'a'.charCodeAt(0));
     else {
      throw new Error(`Invalid character '${ch}' in number ${str}`);
    }
    if (digit >= b) throw new Error(`Digit ${digit} out of range for base ${base} in ${str}`);
    value = value * b + digit;
  }
  return value;
}
