class SmartCalculator {
  constructor(initialValue) {
    this.value = initialValue;
    this.stackNumbers = [initialValue];
    this.stackOperators = [];
    // this.positionLastMinOp = 0;
  }

  add(number) {
    this.value = this.value + number;
    this.stackNumbers.push(number);
    // this.positionLastMinOp = this.stackOperators.length;
    this.stackOperators.push("add");
    return this;
  }
  
  subtract(number) {
    this.value = this.value - number;
    this.stackNumbers.push(number);
    // this.positionLastMinOp = this.stackOperators.length;
    this.stackOperators.push("subtract");
    return this;
  }

  multiply(number) {
    if(this.stackOperators[this.stackOperators.length - 1] == "add") {
      this.value = this.value - this.stackNumbers[this.stackNumbers.length - 1] 
        + this.stackNumbers[this.stackNumbers.length - 1] * number;
    }
    else {
      if(this.stackOperators[this.stackOperators.length - 1] == "subtract") {
        this.value = this.value + this.stackNumbers[this.stackNumbers.length - 1] 
        - this.stackNumbers[this.stackNumbers.length - 1] * number;
      }
      else {
        this.value = this.value * number;
      }
    }

    this.stackNumbers.push(number);
    this.stackOperators.push("multiply");
    return this;
  }

  devide(number) {
    if(this.stackOperators[this.stackOperators.length - 1] == "add") {
      this.value = this.value - this.stackNumbers[this.stackNumbers.length - 1] 
        + this.stackNumbers[this.stackNumbers.length - 1] / number;
    }
    else {
      if(this.stackOperators[this.stackOperators.length - 1] == "subtract") {
        this.value = this.value + this.stackNumbers[this.stackNumbers.length - 1] 
        - this.stackNumbers[this.stackNumbers.length - 1] / number;
      }
      else {
       this.value = this.value / number;
      }
    }

    this.stackNumbers.push(number);
    this.stackOperators.push("devide");
    return this;
  }

  pow(number) {
   
    if(this.stackOperators.length == 0) {
      this.value = Math.pow(this.value, number);
      this.stackOperators.push("pow");
      this.stackNumbers.push(number);
      return this;
    }

    let num = this.stackNumbers[this.stackNumbers.length - 1];
    let op = this.stackOperators[this.stackOperators.length - 1];

    if(op == "add") {     
      this.value = this.value - num + Math.pow(num, number);
    }

    if(op == "subtract") {
      this.value = this.value + num - Math.pow(num, number);
    }

    if((op == "multiply" || op == "devide") || op == "pow") {
      let newNumber = Math.pow(num, number)
      let current = new SmartCalculator(this.stackNumbers[0]);

      for (let i = 0; i < this.stackOperators.length - 1; i++) {
        current[this.stackOperators[i]](this.stackNumbers[i + 1]);
      }

      current[op](newNumber);
      this.value = current.value;
    }

    this.stackOperators.push("pow");
    this.stackNumbers.push(number);
    return this;
  }

  toString() {
    return this.value;
  }

}

module.exports = SmartCalculator;
