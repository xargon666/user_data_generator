// Faker Setup ************************************************************************************
const { faker } = require("@faker-js/faker");
faker.setLocale('en_GB')

// Variables **************************************************************************************
let output = document.querySelector(".output-desktop");
let num = document.querySelector("#num");
let settingsContainer = document.querySelector("#settings");
let options = settingsContainer.querySelectorAll("input[type=checkbox]"); // nodelist of checkboxes
let generateButton = document.querySelector("#gen");
let clearButton = document.querySelector("#clear");
let checkedCount = document.querySelector("#checkedCount");
let checkAll = document.querySelector("#checkAllOptions");
let uncheckAll = document.querySelector("#uncheckAllOptions");
let exportButton = document.querySelector('#export')
let activeSettings = [];
let tableHeaders = [];
let tableRows = [];

// Button Event Listeners
exportButton.addEventListener("click",exportCSV)
checkAll.addEventListener("click", checkAllOptions);
uncheckAll.addEventListener("click", uncheckAllOptions);
clearButton.addEventListener("click", clearResultsClick);
for (const option of options) {
    option.addEventListener("click", updateDisplay);
}

// Make a new table and rows equal to number specified
generateButton.addEventListener("click", () => {
    clearResults(); // clears onscreen results for each generate to avoid issues
    if (num.value < 1) {
        buttonTextChange(generateButton,"Enter a number")
        return
    }
    let int = parseInt(num.value);
    for (let i = 0; i < int; i++) {
        generate(i);
    }
    // button text change
    buttonTextChange(generateButton,"Data Generated")
});

// Functions **************************************************************************************

function buttonTextChange(button,string) {
    if (typeof(string) !== "string") return
    if (typeof(button) !== "object") return
    // button text change
    const originalText = button.textContent
    button.textContent = string
    setTimeout(()=>{
        button.textContent = originalText
    },900)
    
}

function exportCSV(){
    if (tableHeaders.length === 0 || tableRows.length === 0) {
        buttonTextChange(exportButton,"No Data!")
        return
    }
    // create csvContent
    let csvContent = "data:text/csv;charset=utf-8,"
    // add array as text string with carriage return
    + tableHeaders.join(",") + "\n"
    // add 2D array as text string with carraige return after each array
    + tableRows.map((e) => e.join(",")).join("\n");
    // converts text content into a URI format that can be passed as a href
    // e.g. replaces spaces with %20
    let encodedUri = encodeURI(csvContent);
    // create hidden link for download hack
    let hiddenLink = document.createElement('a')
    hiddenLink.href = encodedUri
    hiddenLink.target = '_blank'
    hiddenLink.download = 'User_Data.csv'
    console.log(hiddenLink)
    hiddenLink.click();
    buttonTextChange(exportButton,"Data Exported")
}

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
    console.table({activeSettings});
}

function clearResultsClick() {
    // remove tables
    clearResults();
    // button text change
    buttonTextChange(clearButton,"Data Removed")
    // clear number input
    num.value = ""
};

function clearResults() {
    // remove contents of output element
    first = output.firstElementChild;
    while (first){
        first.remove()
        first = output.firstElementChild
    }
    // just to be sure there are no tables anywhere
    let tbl = document.querySelector("table");
    if (tbl) {
        tbl.remove();
    }
    // clear variables for csv output
    tableHeaders = [];
    tableRows = []
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
      if (firstName === ""){
        console.log("faker has failed somehow");
      }
      // not available in current faker ver?
      // let age = faker.date.birthdate()
      hasTable = output.querySelector("table")
      console.log("hasTable",hasTable)
      if (!hasTable) Record.newTable(); // if no content in output, create a new table
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
      console.log({record})
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
        tableHeaders = []
        tableRows = []
        let tbl = document.createElement("table");
        let row = document.createElement("tr");
        // create header
        for (let field in activeSettings) {
            console.log("creating header")
            const fieldName = activeSettings[field];
            let header = document.createElement("th");
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
            header.textContent = text; // add text
            // Add header field to array for export
            tableHeaders.push(text)
            // Add header field to table
            row.appendChild(header);
        }
        tbl.appendChild(row);
        output.appendChild(tbl);
    }

    newRow() {
        let tbl = output.querySelector("table");
        let row = document.createElement("tr");
        let arrayRow = []
        for (const prop in this) {
            let value = this[prop]
            // exit loop for non-selected prop
            console.log("activeSettings has values?",activeSettings)
            if (!activeSettings.includes(prop)) continue;
            let cell = document.createElement("td");
            arrayRow.push(value)
            // add row to table
            cell.textContent = value;
            row.appendChild(cell);
        }
        // add row data to array for export
        tableRows.push(arrayRow)
        tbl.appendChild(row);
        console.log({row})
        console.log({tbl})
    }
}

// Call updateDisplay once at runtime =============================================================
updateDisplay();
console.log("activeSettings initial state: ",activeSettings)
