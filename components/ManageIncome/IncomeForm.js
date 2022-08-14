import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date.js";
import { GlobalStyles } from "../../constants/styles";

function IncomeForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    //date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const incomeData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(incomeData.amount) && incomeData.amount > 0;
    const dateIsValid = incomeData.date.toString() !== "Invalid Date";
    const descriptionIsValid = incomeData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid data", "Please check your data");
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(incomeData);
  }

  const formIsInvalid =
    inputs.amount.isValid === false ||
    inputs.date.isValid === false ||
    inputs.description.isValid === false;

  return (
    <View style={styles.formstyle}>
      <Text style={styles.title}> Your Income </Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs.amount.isValid}
          TextInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputs.date.isValid}
          TextInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        inValid={!inputs.description.isValid}
        TextInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
          //autoCapitalize: "sentences",
          //autoCorrect: false,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errortext}>
          Invalid input values. Please check your entered data!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {" "}
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default IncomeForm;

const styles = StyleSheet.create({
  formstyle: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errortext: {
    color: "red",
    textAlign: "center",
    margin: 8,
  },
});
