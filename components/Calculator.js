/**
 * INSPIRATIONS:
 * a. https://codepen.io/freeCodeCamp/pen/rNrweyV
 * b. https://github.com/angle943/iphone-calculator-js
 *
 * STEPS:
 * 1. Set up the initial project structure - done
 * 2. Create the Calculator component - done
 * 3. Implement the basic UI for the calculator - done
 * 4. Add state management for calculator inputs and results - done
 * 5. Implement the logic for basic arithmetic operations - done
 * 6. Add event handlers for button clicks - done
 * 7. Style the calculator for better user experience - done
 * 8. Test the calculator functionality - done
 * 9. Fix any bugs and optimize the code - done
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// default screen width
const screen = Dimensions.get("window");
// button width relative to screen width
const buttonWidth = screen.width / 4;

const Calculator = () => {
  // state variables for the calculator
  const [currentValue, setCurrentValue] = useState("0");
  // operator is the current operator (+, -, *, /)
  const [operator, setOperator] = useState(null);
  // previousValue is the value before the current operator
  const [previousValue, setPreviousValue] = useState(null);

  /**
   * function to handle number input
   * @param {*} num : number input
   */
  const handleNumber = (num) => {
    if (currentValue === "0") {
      setCurrentValue(num.toString());
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  /**
   * function to handle operator input
   * @param {*} op : operator input
   */
  const handleOperator = (op) => {
    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue("0");
  };

  // clear function to reset the calculator
  const clear = () => {
    setCurrentValue("0");
    setOperator(null);
    setPreviousValue(null);
  };

  // calculate function to perform the calculation
  const calculate = () => {
    if (operator && previousValue) {
      const current = parseFloat(currentValue);
      const previous = parseFloat(previousValue);
      switch (operator) {
        case "+":
          setCurrentValue((previous + current).toString());
          break;
        case "-":
          setCurrentValue((previous - current).toString());
          break;
        case "*":
          setCurrentValue((previous * current).toString());
          break;
        case "/":
          setCurrentValue((previous / current).toString());
          break;
      }
      setOperator(null);
      setPreviousValue(null);
    }
  };

  // buttons layout for the calculator in a matrix form
  const buttons = [
    ["C", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{currentValue}</Text>
      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((button) => (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                button === "0" ? styles.zeroButton : {},
                ["/", "*", "-", "+", "="].includes(button)
                  ? styles.operatorButton
                  : {},
                ["C", "+/-", "%"].includes(button) ? styles.topButton : {},
              ]}
              onPress={() => {
                switch (button) {
                  case "C":
                    clear();
                    break;
                  case "+/-":
                    setCurrentValue((parseFloat(currentValue) * -1).toString());
                    break;
                  case "%":
                    setCurrentValue(
                      (parseFloat(currentValue) / 100).toString()
                    );
                    break;
                  case "=":
                    calculate();
                    break;
                  case "+":
                  case "-":
                  case "*":
                  case "/":
                    handleOperator(button);
                    break;
                  default:
                    handleNumber(button);
                }
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  ["/", "*", "-", "+", "="].includes(button)
                    ? styles.operatorButtonText
                    : {},
                  ["C", "+/-", "%"].includes(button)
                    ? styles.topButtonText
                    : {},
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  value: {
    color: "white",
    fontSize: 72,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: buttonWidth - 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: buttonWidth,
    margin: 5,
  },
  zeroButton: {
    flex: 2,
    paddingLeft: 35,
    alignItems: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: 36,
  },
  operatorButton: {
    backgroundColor: "#FF9500",
  },
  operatorButtonText: {
    color: "white",
  },
  topButton: {
    backgroundColor: "#A6A6A6",
  },
  topButtonText: {
    color: "black",
  },
});

export default Calculator;
