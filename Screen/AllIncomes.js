import { useContext } from "react";
import { Text } from "react-native";
import IncomesOutput from "../components/IncomesOutput/IncomesOutput";
import { IncomeContext } from "../store/incomes-context";

function AllIncomes() {
  const incomeCtx = useContext(IncomeContext);
  console.log(incomeCtx.incomes);
  return (
    <IncomesOutput
      incomes={incomeCtx.incomes}
      incomesPeriod="Total"
      fallbackText="No registered income found!"
    />
  );
}

export default AllIncomes;
