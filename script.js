const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdownSlct = document.querySelectorAll(".drop-down select");
let btn = document.querySelector("#btn");
let msg = document.querySelector(".msg");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for (const select of dropdownSlct) { 
  for (const currCode in countryList) {
    newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",  (evt) => {
    updateFlag(evt.target);
  });
}
const exchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response= await fetch(URL)
let data= await response.json();
let rate=data[toCurr.value.toLowerCase()]
let finalAmt=rate*amtVal
console.log(finalAmt)
msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeRate();
});
