var user = document.querySelector(".login__input--user");
var pin = document.querySelector(".login__input--pin");
var mainPage = document.querySelector(".main");
var accBalance = document.querySelector(".balance__value");
let transferUser = document.querySelector(".form__input--to");
let transferAmount = document.querySelector(".form__input--amount");
let loginPage = document.querySelector(".login");
let wel = document.querySelector(".welcome");

let userDetail = [
  {
    userName: "priya",
    pin: "1234",
    accBalance: 2000,
    movements: [200, -400, 100, 500],
  },
  {
    userName: "asri",
    pin: "1235",
    accBalance: 3000,
    movements: [200, -400, 100, 500],
  },
  {
    userName: "rathi",
    pin: "1236",
    accBalance: 8000,
    movements: [200, -400, 100, 500],
  },
  {
    userName: "venky",
    pin: "1237",
    accBalance: 4000,
    movements: [200, -400, 100, 500],
  },
  {
    userName: "rahul",
    pin: "1238",
    accBalance: 3000,
    movements: [200, -400, 100, 500],
  },
  {
    userName: "mohan",
    pin: "1234",
    accBalance: 1000,
    movements: [200, -400, 100, 500],
  },
];

var user1;

function login() {
  let currentUser = userDetail.find((d) => d.userName === user.value);

  if (currentUser && currentUser.pin === pin.value) {
    console.log("success");
    mainPage.style.opacity = 1;

    accBalance.innerHTML = currentUser.accBalance;
    user1 = currentUser;
    renderMovements(user1.movements);
    loginPage.style.display = "none";
    wel.style.display = "none";
  } else {
    alert("Invalid user or pin");
  }
}

function transferMoney() {
  const receiverUser = transferUser.value;
  const senderUser = user1.userName;
  const amount = parseInt(transferAmount.value);

  let sender = userDetail.find((d) => d.userName === senderUser);
  let receiver = userDetail.find((d) => d.userName === receiverUser);

  if (amount <= 0) {
    alert("Amount should be greater than zero.");
    return;
  }

  if (!sender || !receiver) {
    alert("Invalid sender or receiver.");
    return;
  }

  if (sender.accBalance < amount) {
    alert("Insufficient balance for transfer.");
    return;
  }

  sender.accBalance -= amount;
  receiver.accBalance += amount;

  accBalance.innerHTML = sender.accBalance;

  user1.movements.push(-amount);
  receiver.movements.push(amount);

  accBalance.innerHTML = user1.accBalance;
  renderMovements(user1.movements);

  transferUser.value = "";
  transferAmount.value = "";
}
var loanAmount = document.querySelector(".form__input--loan-amount");

function loan() {
  var reqLoan = parseInt(loanAmount.value);

  if (reqLoan > 0) {
    user1.accBalance += reqLoan;
    user1.movements.push(reqLoan);

    accBalance.innerHTML = user1.accBalance;
    renderMovements(user1.movements);

    console.log("Loan approved.");
  } else {
    alert("Enter a valid loan amount.");
  }
  loanAmount.value = "";
}

function logout() {
  let currentUser = userDetail.find((d) => d.userName === user.value);

  if (currentUser && currentUser.pin === pin.value) {
    console.log("success");
    mainPage.style.opacity = 0;
    accBalance.innerHTML = currentUser.accBalance;
    user1 = currentUser;
  } else {
    alert("Invalid user or pin");
  }
}

function renderMovements(movements) {
  const movementsContainer = document.querySelector(".movements");
  movementsContainer.innerHTML = "";

  movements.forEach((mov, i) => {
    let type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${new Date().toLocaleDateString()}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
  updateSummary(movements);
}

function updateSummary(movements) {
  const totIn = document.querySelector(".summary__value--in");
  const totOut = document.querySelector(".summary__value--out");
  const totInterest = document.querySelector(".summary__value--interest");

  // Calculate total deposits
  const totalDeposits = movements
    .filter((mov) => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  totIn.textContent = `${totalDeposits}€`;

  // Calculate total withdrawals
  const totalWithdrawals = movements
    .filter((mov) => mov < 0)
    .reduce((sum, mov) => sum + Math.abs(mov), 0);
  totOut.textContent = `${totalWithdrawals}€`;

  const totalInterest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * 0.015)
    .reduce((sum, interest) => sum + interest, 0);
  totInterest.textContent = `${totalInterest.toFixed(2)}€`;
}
function sortArray() {
  let currentUser = userDetail.find((d) => d.userName === user.value);
  user1 = currentUser;
  console.log(user1);
  user1.movements.sort();
  renderMovements(user1.movements.sort());
}
