import "./styles.css";
import React from "react";
import { useState } from "react";

let date;
let newoutput = "";
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function App() {
  const [output, setOutput] = useState("");
  function inputHandler(event) {
    if (date) {
      setTimeout(() => {
        checkPalindrome();
      }, 1000);
    } else {
      alert("Please fill the date field");
    }
  }

  function checkPalindrome() {
    const dateArray = date.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];
    let setFlag = checkAllCombi(inputYear, inputMonth, inputDate);
    if (setFlag) {
      newoutput = `Whoa!!! Your birthdate in format ${setFlag} is palindrome`;
    } else {
      let [nextdate, diff] = findNextDate(inputDate, inputMonth, inputYear);
      newoutput = `Aww snap! Your birthdate is not palindrome. Nearest palindrome date is ${nextdate} You missed it by ${diff} days.`;
    }
    setOutput(<p>{newoutput}</p>);
  }

  function checkAllCombi(yyyy, mm, dd) {
    //yyyymmdd format string
    const dateFormat1 = yyyy + mm + dd;

    //ddmmyyyy format string
    const dateFormat2 = dd + mm + yyyy;

    //mmddyy format string
    const dateFormat3 = mm + dd + yyyy.substring(2);

    //mddyyyy format string
    const dateFormat4 = Number(mm) + dd + yyyy;

    if (isPalindrome(dateFormat1)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (isPalindrome(dateFormat2)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (isPalindrome(dateFormat3)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (isPalindrome(dateFormat4)) {
      return `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function isPalindrome(stringCheck) {
    const max = Math.floor(stringCheck.length / 2);
    for (let i = 0; i < max; i++) {
      if (stringCheck[i] !== stringCheck[stringCheck.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  function findNextDate(date, month, year) {
    let ddNo1 = Number(date);
    let mmNo1 = Number(month);
    let yyNo1 = Number(year);
    let ddNo2 = Number(date);
    let mmNo2 = Number(month);
    let yyNo2 = Number(year);

    for (let i = 1; i > 0; i++) {
      //forward check
      ddNo1 = ddNo1 + 1;
      if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
        ddNo1 = 1;
        mmNo1 = mmNo1 + 1;
        if (mmNo1 > 12) {
          mmNo1 = 1;
          yyNo1 = yyNo1 + 1;
        }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
      if (mmString.length === 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length === 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }

      //backward check
      if (yyNo2 > 1) {
        ddNo2 = ddNo2 - 1;
        if (ddNo2 < 1) {
          mmNo2 = mmNo2 - 1;
          if (mmNo2 < 1) {
            mmNo2 = 12;
            yyNo2 = yyNo2 - 1;
            if (yyNo2 < 1) {
              break;
            }
            ddNo2 = datesInMonth[mmNo2 - 1];
          }
        }
        let yyString = yyNo2.toString();
        let mmString = mmNo2.toString();
        let ddString = ddNo2.toString();
        if (mmString.length === 1) {
          mmString = "0" + mmString;
        }
        if (ddString.length === 1) {
          ddString = "0" + ddString;
        }
        let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
        if (setFlagNextDate) {
          return [`${setFlagNextDate}`, i];
        }
      }
    }
  }

  return (
    <div className="App">
      <h1 className="center">
        Enter your birth date below and we'll tell you whether it's{" "}
        <span style={{ color: "#EF4444" }}> palindrome or not </span>
      </h1>

      <form>
        <input
          style={{ cursor: "pointer" }}
          onChange={(event) => {
            date = event.target.value;
          }}
          className="input"
          type="date"
          id="datePicker"
        ></input>
      </form>

      <button onClick={inputHandler} className="btn">
        Check
      </button>
      <div>{output}</div>
    </div>
  );
}
