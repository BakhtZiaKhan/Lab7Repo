import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator', 
  templateUrl: './calculator.component.html', 
  styleUrls: ['./calculator.component.css'] 
})
export class CalculatorComponent {
  // Stores the current number displayed on the calculator
  currentNumber = '0';
  
  // Stores the first operand
  firstOperand: number | null = null;
  
  // Stores the  operator 
  operator: string | null = null;
  
  
  waitForSecondNumber = false;

  // Handles when a number button is pressed
  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      // replace the display with the new number
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      // If number isnt 0 appened numbers
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  // Handles decimal button
  getDecimal() {
    // Add a decimal point if there isn't one already
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  // Performs the calculation 
  private doCalculation(op: string, secondOp: number) {
    switch (op) {
      case '+':
        return (this.firstOperand || 0) + secondOp; 
      case '-':
        return (this.firstOperand || 0) - secondOp; 
      case '*':
        return (this.firstOperand || 0) * secondOp; 
      case '/':
        return (this.firstOperand || 0) / secondOp; 
      default:
        return secondOp; // Return the second operand if no operator is defined
    }
  }

  // Handles when an operator button is pressed (+, -, *, /)
  public getOperation(op: string) {
    if (this.firstOperand === null) {
      // If no first operand, set the current number as the first operand
      this.firstOperand = parseFloat(this.currentNumber);
    } else if (this.operator) {
      // If an operator already exists, calculate the result with the current operator
      const result = this.doCalculation(this.operator, parseFloat(this.currentNumber));
      this.currentNumber = String(result); // Display the result
      this.firstOperand = result; // Update the first operand to the result
    }
    this.operator = op; // Set the selected operator
    this.waitForSecondNumber = true; 
  }

  // Resets the calculator 
  public clear() {
    this.currentNumber = '0'; 
    this.firstOperand = null; 
    this.operator = null; 
    this.waitForSecondNumber = false; 
  }

  // Handles when the equals button is pressed to calculate the final result
  public calculate() {
    if (this.firstOperand !== null && this.operator !== null) {
      // Perform the calculation with the current operator and second operand
      this.currentNumber = String(this.doCalculation(this.operator, parseFloat(this.currentNumber)));
      this.firstOperand = null; // Clear first operand after calculation
      this.operator = null; // Clear operator after calculation
      this.waitForSecondNumber = false; 
    }
  }
}
