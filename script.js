const transType = document.getElementById("transaction-type");
const title = document.getElementById("title");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const transDate = document
    .getElementById("transaction-date");
const addTransBtn = document.getElementById("add-transaction-btn");
const transForm = document.getElementById("transaction-form");
const transList = document.getElementById("transaction-list");
const searchTrans = document.getElementById("search-transaction");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");
const filterDate = document.getElementById("filter-date");
const transCount = document.getElementById("transaction-count");
const balanceValue = document.getElementById("balance-value");
const incomeValue = document.getElementById("income-value");
const expenseValue = document.getElementById("expense-value");
const monthValue = document.getElementById("month-value");
const summaryNote = document.querySelector(".summary-note");


let transData = JSON.parse(localStorage.getItem("transData")) || [];
addToTrans(transData);
dashboardStat()
transCount.textContent = ` ${transData.length} transactions`;

let mode = "add";
let editingId = null;


function addTrans() {

    if (mode === "edit") {

        const idForEditing = transData.find(({ id }) => id === editingId);

        idForEditing.transtype = transType.value;
        idForEditing.title = title.value;
        idForEditing.description = description.value;
        idForEditing.amount = amount.value;
        idForEditing.category = category.value;
        idForEditing.transdate = transDate.value;

        localStorage.setItem("transData", JSON.stringify(transData));
        transCount.textContent = ` ${transData.length} transactions`;

        mode = "add";
        editingId = null;
        addTransBtn.textContent = "Add Transaction";

        transType.value = "";
        title.value = "";
        description.value = "";
        amount.value = "";
        category.value = "";
        transDate.value = "";



    } else {

        transData.unshift({
            id: crypto.randomUUID(),
            transtype: transType.value,
            title: title.value,
            description: description.value,
            amount: amount.value,
            category: category.value,
            transdate: transDate.value,
        })

        localStorage.setItem("transData", JSON.stringify(transData));
        transCount.textContent = ` ${transData.length} transactions`;

        transType.value = "";
        title.value = "";
        description.value = "";
        amount.value = "";
        category.value = "";
        transDate.value = "";

    }


}

function addToTrans(dataToAdd) {

    transList.innerHTML = "";

    dataToAdd.forEach((data) => {

        const type = data.transtype.slice(0, 1).toUpperCase() + data.transtype.slice(1).toLowerCase();
        const category = data.category.slice(0, 1).toUpperCase() + data.category.slice(1).toLowerCase();
        const date = new Date(data.transdate);
        const dateToDisplay = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })

        transList.innerHTML += `
         <tr class="transaction-row" id="${data.id}" >
              <td>
                <div class="transaction-description"> <strong>${data.title}</strong> <span>${data.description}</span>
                </div>
              </td>
              <td> <span class="category-badge">${category}</span> </td>
              <td> <span class="type-badge ${data.transtype}-badge">${type}</span> </td>
              <td class="amount ${data.transtype}-amount"> ${data.transtype === "income" ? "+" : "-"}$${data.amount} </td>
              <td>${dateToDisplay}</td>
              <td>
                <div class="action-buttons"> <button type="button" class="btn btn-small btn-edit" data-action="edit">
                    Edit </button> <button type="button" class="btn btn-small btn-delete" data-action="delete"> Delete
                  </button> </div>
              </td>
        </tr> 
        `
    })
}

function deleteTrans(elToDelete) {

    const parentEl = elToDelete.closest("tr");
    const idOfParent = parentEl.id;

    transData = transData.filter(({ id }) => id !== idOfParent);

    localStorage.setItem("transData", JSON.stringify(transData));
    addToTrans(transData);
    transCount.textContent = ` ${transData.length} transactions`;

    dashboardStat();

}

function editTrans(elToEdit) {

    const parentEl = elToEdit.closest("tr");
    const idOfParent = parentEl.id;

    const idForEditing = transData.find(({ id }) => id === idOfParent);

    console.log(idForEditing);

    transType.value = idForEditing.transtype;
    title.value = idForEditing.title;
    description.value = idForEditing.description;
    amount.value = idForEditing.amount;
    category.value = idForEditing.category;
    transDate.value = idForEditing.transdate;

    addTransBtn.textContent = "Update Transaction";
    mode = "edit";
    editingId = idOfParent;

}

function searchAndSort() {

    const valueOfSearchTrans = searchTrans.value;
    const valueOfFilterType = filterType.value;
    const valueOfFilterCategory = filterCategory.value;
    const valueOfFilterDate = filterDate.value;


    const filteredArray = transData.filter((data) => data.title.toLowerCase().includes(valueOfSearchTrans.toLowerCase()) || data.description.toLowerCase().includes(valueOfSearchTrans.toLowerCase()));

    console.log(filteredArray)

    const filteredType = valueOfFilterType !== "all" ? filteredArray.filter((data) => data.transtype === valueOfFilterType) : filteredArray;

    console.log(filteredType)
    const filteredCategory = valueOfFilterCategory !== "all" ? filteredType.filter((data) => data.category === valueOfFilterCategory) : filteredType;

    const filteredDate = valueOfFilterDate !== "all" ? filteredCategory.filter((data) => data.transdate.slice(0, 7) === valueOfFilterDate) : filteredCategory;


    addToTrans(filteredDate);

}



function dashboardStat() {

    const incomeObj = transData.filter((data) => data.transtype === "income");
    const expenseObj = transData.filter((data) => data.transtype === "expense");

    let totalIncome = incomeObj.reduce((acc, data) => {
        return Number(data.amount) + acc;
    }, 0);
    let totalExpense = expenseObj.reduce((acc, data) => {
        return Number(data.amount) + acc;
    }, 0);

    let totalBalance = totalIncome - totalExpense;

    if(totalIncome < totalExpense){
        balanceValue.textContent = `-$${Math.abs(totalBalance)}`;
        balanceValue.style.color = "red";
    }
    else{
        balanceValue.textContent = `$${Math.abs(totalBalance)}`;
        balanceValue.style.color = "blue";
    }

    incomeValue.textContent = `$${totalIncome}`;
    expenseValue.textContent = `$${totalExpense}`;


    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {month: "long"});
    const realTimeSpend = transData.filter((data)=> (Number(data.transdate.split("-")[1]) === currentDate.getMonth() + 1 && data.transtype === "expense"));

    const monthTotalSpend = realTimeSpend.reduce((acc,data)=>{
        return acc + Number(data.amount);
    },0);

    monthValue.textContent = `$${monthTotalSpend}`;
    summaryNote.textContent = `${currentMonth} spending`;

}


addTransBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addTrans();
    addToTrans(transData);
    dashboardStat();
});

transList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
        deleteTrans(event.target);
    }
})

transList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-edit")) {
        editTrans(event.target);
    }
})


searchTrans.addEventListener("input", searchAndSort);
filterType.addEventListener("change", searchAndSort);
filterCategory.addEventListener("change", searchAndSort);
filterDate.addEventListener("change", searchAndSort);