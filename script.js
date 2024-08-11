/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-07-26T17:01:17.194Z",
    "2024-08-03T23:36:17.929Z",
    "2024-08-09T10:51:36.790Z",
  ],
  currency: 'USD',
  locale: "en-US",
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222, movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-08-01T18:49:59.371Z",
    "2024-08-07T12:01:20.894Z",
  ],
  currency: 'EUR',
  locale: 'te-IN',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-12-07T21:31:17.178Z",
    "2023-01-23T07:42:02.383Z",
    "2024-01-21T09:15:04.904Z",
    "2024-03-28T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-07-29T17:01:17.194Z",
    "2024-07-12T23:36:17.929Z",
    "2024-08-01T10:51:36.790Z",
  ],
  currency: 'INR',
  locale: "en-US",

};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2023-12-07T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2024-06-21T09:15:04.904Z",
    "2024-07-28T10:17:24.185Z",
    "2024-08-08T14:11:59.604Z",
  ],
  currency: 'USD',
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// CALCULATE DISPLAY DAYS
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayspassed = calcDaysPassed(new Date(), date);
  console.log(dayspassed)

  if (dayspassed === 0) return 'Today';
  if (dayspassed === 1) return 'Yesterday';
  if (dayspassed <= 7) return `${dayspassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
  // const year1 = date.getFullYear();
  // const month1 = `${date.getMonth()}`.padStart(2, 0);
  // const date1 = `${date.getDate()}`.padStart(2, 0);
  // return `${date1}/${month1}/${year1}`;

};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
console.log(movs);
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';



    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCur(mov, acc.locale, acc.currency)}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAcccount, !sorted);
  sorted = !sorted;

})

//Create UserNames

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('')
  })
}
createUserNames(accounts);

//Show Total Balance

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${formatCur(acc.balance, acc.locale, acc.currency)}`;
}



// Display the Total IN, Out and INTEREST

const displayIncomes = function (acc) {
  const displayIn = acc.movements.filter(In => In > 0)
    .reduce((acc, In) => acc + In, 0);
  labelSumIn.textContent = `${formatCur(displayIn, acc.locale, acc.currency)}`;

  const displayOut = acc.movements.filter(Out => Out < 0)
    .reduce((acc, Out) => acc + Out, 0);
  labelSumOut.textContent = `${formatCur(displayOut, acc.locale, acc.currency)}`;

  const displayInterest = acc.movements.filter(Interest => Interest > 100)
    .map(Interest => (Interest * acc.interestRate) / 100)
    .reduce((acc, Interest) => acc + Interest, 0)
  labelSumInterest.textContent = `${formatCur(displayInterest, acc.locale, acc.currency)}`;
}

const displayUi = function (acc) {
  //Display Movements
  displayMovements(acc);
  //Display Summary
  displayIncomes(acc);
  //Display Balance
  calcDisplayBalance(acc);
}

const startLogOutTime = function () {
  let time = 120;

  // Call the time function in every second
  const timer = setInterval(() => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //print everyime the function Will call
    labelTimer.textContent = `${min}:${sec}`

    //Decrese the time
    // time--;

    // // if the log out the account the time will be zero
    // if(time === -1){
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    //Decrese the time
    time--;

  }, 1000);
  return timer;
}
//EVENT HANDLER
let currentAcccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAcccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAcccount);

  if (currentAcccount.pin === +(inputLoginPin.value)) {
    // console.log('Login');
    //Displau UI and Message 
    labelWelcome.textContent = `Welcome back, ${currentAcccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Display the dates

    const live = new Date();
    const locale = navigator.language;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      // weekday: 'long',
    };
    console.log(locale);
    // labelDate.textContent = new Intl.DateTimeFormat(currentAcccount.locale,options).format(live)
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(live)
    // const year = live.getFullYear();
    // const month = `${live.getMonth()}`.padStart(2, 0);
    // const date = `${live.getDate()}`.padStart(2, 0);
    // const hours = `${live.getHours()}`.padStart(2, 0);
    // const minute = `${live.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${date}/${month}/${year},${hours}:${minute}`;
    // console.log(live);

    //Clear Input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    if (timer) clearInterval(timer);
    timer = startLogOutTime();
    // //Display Movements
    // displayMovements(currentAcccount.movements);
    // //Display Summary
    // displayIncomes(currentAcccount);
    // //Display Balance
    // calcDisplayBalance(currentAcccount);
    displayUi(currentAcccount);
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && receiverAcc && receiverAcc.username !== currentAcccount.username && currentAcccount.balance >= amount) {
    // console.log('trasaction Success')
    // Display the transfers
    currentAcccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // //Display Movements
    // displayMovements(currentAcccount.movements);
    // //Display Summary
    // displayIncomes(currentAcccount);
    // //Display Balance
    // calcDisplayBalance(currentAcccount);

    // Display Transfer Dates
    currentAcccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    clearInterval(timer);
    timer = startLogOutTime();

    displayUi(currentAcccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanRequest = Math.floor(+(inputLoanAmount.value));
  // const loanRequest = inputLoanAmount.value;
  if (loanRequest > 0 && currentAcccount.movements.some(mov => mov >= loanRequest * 0.1)) {
    // console.log('button clicked')
    setTimeout(function () {
      currentAcccount.movements.push(loanRequest);

      // Display Loan Dates
      currentAcccount.movementsDates.push(new Date().toISOString());

      clearInterval(timer);
      timer = startLogOutTime();

      displayUi(currentAcccount);
    }, 3000)
  }
  inputLoanAmount.value = '';
})


btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  inputLoanAmount.value = '';
  if (inputCloseUsername.value === currentAcccount.username && +(inputClosePin.value) === currentAcccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAcccount.username);

    //Delete Account
    accounts.splice(index, 1);
    //closing the main UI
    containerApp.style.opacity = 0;
  }

})

////////////////////////////////////////
// Numbers

// console.log(23 === 23.0);

// // Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// // Binary base 2 - 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number('23'));
// console.log(+'23');

// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10));

// console.log(Number.parseInt('  2.5rem  '));
// console.log(Number.parseFloat('  2.5rem  '));

// // console.log(parseFloat('  2.5rem  '));

// // Check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));

// // Checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));

// ///////////////////////////////////////
// // Math and Rounding
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.max(5, 18, '23px', 11, 2));

// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// // 0...1 -> 0...(max - min) -> min...max
// // console.log(randomInt(10, 20));

// // Rounding integers
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9'));

// console.log(Math.trunc(23.3));

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));
// // Rounding decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));


// ///////////////////////////////////////
// // The Remainder Operator
// console.log(5 % 2);
// console.log(5 / 2); // 5 = 2 * 2 + 1

// console.log(8 % 3);
// console.log(8 / 3); // 8 = 2 * 3 + 2

// console.log(6 % 2);
// console.log(6 / 2);

// console.log(7 % 2);
// console.log(7 / 2);

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 3, 6, 9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });


// ///////////////////////////////////////
// // Numeric Separators

// // 287,460,000,000
// const diameter = 287_460_000_000;
// console.log(diameter);

// const price = 345_99;
// console.log(price);

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;

// const PI = 3.1415;
// console.log(PI);

// console.log(Number('230_000'));
// console.log(parseInt('230_000'));

// ///////////////////////////////////////
// // Working with BigInt
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1);
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);

// console.log(4838430248342043823408394839483204n);
// console.log(BigInt(48384302));

// // Operations
// console.log(10000n + 10000n);
// console.log(36286372637263726376237263726372632n * 10000000n);
// // console.log(Math.sqrt(16n));

// const huge = 20289830237283728378237n;
// const num = 23;
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == '20');

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(11n / 3n);
// console.log(10 / 3);

// /////////////////////////////////////
// // Dates


// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('December 24, 2015'));
// // console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(new Date(2142237180000));

// console.log(Date.now());

// future.setFullYear(2040);
// console.log(future);

///////////////////////////////////////////////
// OPERATIONS WITH DATES

// const future1 = new Date(2024, 10, 25, 2, 45);
// console.log(future1.toISOString())

// const datepassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const date2 = datepassed(new Date(2004, 1, 3), new Date(2004, 7, 9));
// console.log(date2);

///////////////////////////////////////
// Internationalizing Numbers (Intl)
// const num = 3884764.23;

// const options = {
//   style: 'currency',
//   currency: 'EUR',
//   // useGrouping: false,
// };

// console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

///////////////////////////////////////
// Timers

// setTimeout
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting...');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// // setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

