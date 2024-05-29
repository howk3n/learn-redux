import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      const { amount, purpose } = action.payload;
      return {
        ...state,
        balance: state.balance + amount,
        loan: amount,
        loanPurpose: purpose,
      };
    case "account/payLoan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      // this is recommended
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}

function customerReducer(state = initialStateCustomer, action) {
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

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
store.dispatch(createCustomer("Dusan Cvijicccc", "694"));
console.log(store.getState());
store.dispatch(updateName("Dusan Cvijic"));

console.log(store.getState());
