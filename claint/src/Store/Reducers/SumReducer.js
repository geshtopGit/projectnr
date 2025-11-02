// const initVal = {
//   sum: 0
// };

// const reducerSum = (state = initVal, action) => {
//   let newSum;

//   switch (action.type) {
//     case "Add":
//       newSum = state.sum + action.payload;
//       localStorage.setItem("sum", newSum);
//       return {
//         ...state,
//         sum: newSum
//       };

//     case "Subtract":
//       newSum = state.sum - action.payload;
//       localStorage.setItem("sum", newSum);
//       return {
//         ...state,
//         sum: newSum
//       };

//     case "Clear":
//       localStorage.removeItem("sum");
//       return {
//         ...state,
//         sum: 0
//       };

//     case "Set":
//       // לא צריך לחבר +action.payload, הוא כבר סכום מוחלט
//       localStorage.setItem("sum", action.payload);
//       return {
//         ...state,
//         sum: action.payload
//       };

//     default:
//       return state;
//   }
// };

// export default reducerSum;
const initVal = {
  sum: parseFloat(localStorage.getItem("sum")) || 0,
  roles: false
};

const reducerSum = (state = initVal, action) => {
  let newSum;

  switch (action.type) {
    case "Add":
      newSum = state.sum + action.payload;
      localStorage.setItem("sum", newSum);
      return { ...state, sum: newSum };

    case "Subtract":
      newSum = state.sum - action.payload;
      localStorage.setItem("sum", newSum);
      return { ...state, sum: newSum };

    case "Clear":
      localStorage.removeItem("sum");
      return { ...state, sum: 0 };

    case "Set":
      localStorage.setItem("sum", action.payload);
      return { ...state, sum: action.payload };

    case "SetRoles":
      return { ...state, roles: action.payload };

    default:
      return state;
  }
};

export default reducerSum;

