import axios from "axios";

const BACKEND_URL = "https://fintech-e922c-default-rtdb.firebaseio.com";

export async function storeIncome(incomeData) {
  const response = await axios.post(BACKEND_URL + "/incomes.json", incomeData);
  const id = response.data.name;
  return id;
}

export async function fetchIncomes() {
  const response = await axios.get(BACKEND_URL + "/incomes.json");
  const incomes = [];

  //console.log(response.data);

  for (const key in response.data) {
    const incomeObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    incomes.push(incomeObj);
  }
  return incomes;
}

export function updateIncome(id, incomeData) {
  return axios.put(BACKEND_URL + "/incomes/" + id + ".json", incomeData);
}

export function deleteIncome(id) {
  return axios.delete(BACKEND_URL + "/incomes/" + id + ".json");
}
