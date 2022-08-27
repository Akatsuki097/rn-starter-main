import axios from "axios";

const BACKEND_URL = "https://fintech-e922c-default-rtdb.firebaseio.com";

export async function storeGoal(goalData) {
  const response = await axios.post(BACKEND_URL + "/goals.json", goalData);
  const id = response.data.name;
  return id;
}

export async function fetchGoals() {
  const response = await axios.get(BACKEND_URL + "/goals.json");
  const goals = [];

  //console.log(response.data);

  for (const key in response.data) {
    const goalObj = {
      id: key,
      isCompleted: response.data[key].isCompleted,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    goals.push(goalObj);
  }
  return goals;
}

export function updateGoal(id, goalData) {
  return axios.put(BACKEND_URL + "/goals/" + id + ".json", goalData);
}

export function deleteGoal(id) {
  return axios.delete(BACKEND_URL + "/goals/" + id + ".json");
}
