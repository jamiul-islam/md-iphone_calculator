import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumber = (num) => {
    if (currentValue === "0") {
      setCurrentValue(num.toString());
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperator = (op) => {
    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue("0");
  };

  const clear = () => {
    setCurrentValue("0");
    setOperator(null);
    setPreviousValue(null);
  };

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
