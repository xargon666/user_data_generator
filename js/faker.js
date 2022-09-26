// Faker Setup ************************************************************************************
const { faker } = require("@faker-js/faker");
faker.setLocale('en_GB')

// Variables **************************************************************************************
let output = document.querySelector(".output");
let num = document.querySelector("#num");
let settingsContainer = document.querySelector("#settings");
let options = settingsContainer.querySelectorAll("input[type=checkbox]"); // nodelist of checkboxes
let generateButton = document.querySelector("#gen");
let clearButton = document.querySelector("#clear");
let checkedCount = document.querySelector("#checkedCount");
let checkAll = document.querySelector("#checkAllOptions");
let uncheckAll = document.querySelector("#uncheckAllOptions");
let activeSettings = [];

// Button Event Listeners
checkAll.addEventListener("click", checkAllOptions);
uncheckAll.addEventListener("click", uncheckAllOptions);
clearButton.addEventListener("click", clearResults);
for (const option of options) {
    option.addEventListener("click", updateDisplay);
}
generateButton.addEventListener("click", () => {
    clearResults(); // clears onscreen results for each generate to avoid issues
    let int = parseInt(num.value);
    for (let i = 0; i < int; i++) {
        generate(i);
    }
});

// Functions **************************************************************************************
function checkAllOptions() {
    for (const option of options) {
        option.checked = true;
    }
    updateDisplay();
}
function uncheckAllOptions() {
    for (const option of options) {
        option.checked = false;
    }
    updateDisplay();
}

function updateDisplay() {
    count = 0;
    activeSettings = [];
    for (const option of options) {
        const fieldName = option.value;
        if (!option.checked) continue; // skip unchecked setting
        count++;
        activeSettings.push(fieldName);
    }
    checkedCount.textContent = count;
    console.log({ activeSettings });
}

function clearResults() {
    let tbl = document.querySelector("table");
    if (tbl) {
        tbl.remove();
    }
}

// Generate Records ===============================================================================
function generate(index) {
  try {
      // get data from fakerJS
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let jobTitle = faker.name.jobTitle();
      let prefix = faker.name.prefix();
      let suffix = faker.name.suffix();
      let jobArea = faker.name.jobArea();
      let phone = faker.phone.phoneNumber();
      let email = faker.internet.email(firstName, lastName);
      let userName = faker.internet.userName(firstName, lastName);
      let password = faker.internet.password(10, true);
      // not available in current faker ver?
      // let age = faker.date.birthdate()
      if (!output.textContent) Record.newTable(); // if no content in output, create a new table
      let record = new Record(
          index,
          firstName,
          lastName,
          jobTitle,
          prefix,
          suffix,
          jobArea,
          phone,
          email,
          userName,
          password
      );
      record.newRow();
  } catch (err) {
      throw new Error(err);
  }
}

// Class ******************************************************************************************
class Record {
    constructor(
        index,
        firstName,
        lastName,
        jobTitle,
        prefix,
        suffix,
        jobArea,
        phone,
        email,
        userName,
        password
    ) {
        this.index = index;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.prefix = prefix;
        this.suffix = suffix;
        this.fullName = `${prefix} ${firstName} ${lastName} ${suffix}`;
        this.jobArea = jobArea;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    static newTable() {
        let tbl = document.createElement("table");
        let tblr = document.createElement("tr");

        for (let field in activeSettings) {
            const fieldName = activeSettings[field];
            let tblh = document.createElement("th");
            let text;
            if (fieldName.includes("Name")) {
                text = fieldName.split("Name");
                text[0] =
                    text[0].slice(0, 1).toUpperCase() +
                    text[0].slice(1).toLowerCase();
                text[1] = "Name";
            } else if (fieldName.includes("job")) {
                text = fieldName.split("job");
                text[0] = "Job";
                text[1] =
                    text[1].slice(0, 1).toUpperCase() +
                    text[1].slice(1).toLowerCase();
            } else {
                text =
                    fieldName.slice(0, 1).toUpperCase() +
                    fieldName.slice(1).toLowerCase();
            }
            Array.isArray(text) && (text = text.join(" "));
            tblh.textContent = text; // add text
            // console.log(tblh);
            tblr.appendChild(tblh);
        }
        tbl.appendChild(tblr);
        output.appendChild(tbl);
    }

    newRow() {
        let tbl = document.querySelector("table");
        let row = document.createElement("tr");
        for (const prop in this) {
            if (!activeSettings.includes(prop)) {
                continue;
            }
            let cell = document.createElement("td");
            cell.textContent = this[prop];
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
}

// Call updateDisplay once at runtime =============================================================
updateDisplay();
