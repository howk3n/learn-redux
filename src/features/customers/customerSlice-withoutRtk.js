const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      const { fullName, nationalID, createdAt } = action.payload;
      return { ...state, fullName, nationalID, createdAt };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
