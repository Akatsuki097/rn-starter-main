import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date.js";
import { GlobalStyles } from "../../constants/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { getFormatedDate } from "react-native-modern-datepicker";
import IconButton from "../UI/IconButton";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [tempdate, setTempdate] = useState(new Date());

  const [confirmDate, setConfirmDate] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date1) => {
    date1.setDate(date1.getDate() - 1);

    setTempdate(date1);
    setDate(date1);

    date1.setDate(date1.getDate() + 1);
    inputChangeHandler("date", getFormatedDate(date1));
    setDatePickerVisibility(false);
    setConfirmDate(true);
  };

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
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid data", "Please check your data");
      setInputs((currInputs) => {
        // console.log(currInputs.date.value, "dateeee ");
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
    console.log(inputs.date.value, "dateeee ");
    onSubmit(expenseData);
  }

  const formIsInvalid =
    inputs.amount.isValid === false ||
    inputs.date.isValid === false ||
    inputs.description.isValid === false;

  return (
    <View style={styles.formstyle}>
      <Text style={styles.title}> Your Expense </Text>
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
        <View style={styles.calender}>
          <Text style={styles.date}>Date </Text>
          <IconButton
            icon="calendar"
            onPress={showDatePicker}
            size={30}
            color={"grey"}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* console.log(confirmDate); */}
      </View>
      {confirmDate && (
        <Text style={[styles.tempdate, styles.date]}>
          {date.toISOString().slice(0, 10)}
        </Text>
      )}
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

export default ExpenseForm;

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
    flex: 0.9,
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
  calender: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  date: {
    fontSize: 14,
    color: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  tempdate: {
    alignItems: "flex-end",
    paddingLeft: 280,
  },
});
