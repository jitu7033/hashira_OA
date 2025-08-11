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

// gcd for big int

function bigintGcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}


class Fraction {
  constructor(numerator, denominator = 1n) {
    if (denominator === 0n) throw new Error('Denominator cannot be zero');
    // Normalize sign to numerator
    if (denominator < 0n) {
      numerator = -numerator;
      denominator = -denominator;
    }
    const g = bigintGcd(numerator, denominator);
    this.n = numerator / g;
    this.d = denominator / g;
  }

  // addition
  add(other) {
    const n = this.n * other.d + other.n * this.d;
    const d = this.d * other.d;
    return new Fraction(n, d);
  }

  // multiplication
  mul(other) {
    const n = this.n * other.n;
    const d = this.d * other.d;
    return new Fraction(n, d);
  }

  // division
  div(other) {
    if (other.n === 0n) throw new Error('Division by zero fraction');
    const n = this.n * other.d;
    const d = this.d * other.n;
    return new Fraction(n, d);
  }

  // convert to string (integer if denominator 1)
  toString() {
    if (this.d === 1n) return this.n.toString();
    return `${this.n.toString()}/${this.d.toString()}`;
  }

  // check if fraction is integer; if so return BigInt else null
  toBigIntIfInteger() {
    if (this.d === 1n) return this.n;
    if (this.n % this.d === 0n) return this.n / this.d;
    return null;
  }
}


