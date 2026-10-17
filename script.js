const currentDate = document.getElementById("currentDate");

     const today = new Date();

  currentDate.textContent = today.toLocaleDateString("en-GB", {
     weekday: "short",
     day: "2-digit",
     month: "short",
     year: "numeric"
     });

const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const incomeInput = document.getElementById("income");
const expenseInput = document.getElementById("expense");

const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses"); 

const emptyState = document.getElementById("emptyState");

const transactionFilter = document.getElementById("transactionFilter");
     
    let currentFilter = "all"; 

    transactionFilter.addEventListener("change", function(){
        currentFilter = transactionFilter.value;
         renderTransactions();
    });



let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault(); 

    const description = descriptionInput.value;
       if (description === ""){
            alert( 'PLEASE ENTER DESCRIPTION')
             return;
       }

    const amount = Number(amountInput.value);
        if (amount <= 0 ){
            alert("PLEASE ENTER A VALID NUMBER")
            return;
        }


    let type;

     if (incomeInput.checked) {
            type = incomeInput.value;
     } else {
            type = expenseInput.value;
     }

     const today = new Date();

      const transaction = {
           description: description,
           amount: amount,
           type: type,
           date: today.toLocaleDateString()
       };
     
 transactions.push(transaction);

 localStorage.setItem("transactions" , JSON.stringify(transactions));

 transactionForm.reset();

 updateSummary();
 renderTransactions();

   
}); 




function updateSummary(){ 
      let income = 0;
      let expenses = 0;
      let balance = 0;

        transactions.forEach(function(transaction){

            if (transaction.type === "income") {
              income += transaction.amount;
            }
            else if(transaction.type === "expense"){
                expenses += transaction.amount;
            } 
            
            });

            balance = income - expenses;
         
        totalIncome.textContent = `₹ ${income}`;
         totalExpenses.textContent = `₹ ${expenses}`;
         totalBalance.textContent = `₹ ${balance}`;
 
        }


 
function renderTransactions() {
          let tableList = document.getElementById("transactionList");

          tableList.innerHTML = "";

 
      let filteredTransaction = transactions;

      if (currentFilter !== "all"){
          filteredTransaction = transactions.filter(function(transaction){
            return transaction.type === currentFilter;
          });
      }
     
      if (filteredTransaction.length === 0) {
        emptyState.style.display = "block";
      } else {
        emptyState.style.display = "none";
      }

filteredTransaction.forEach(function(transaction, index) {


    let tableRow = document.createElement("tr");


     let numberCell = document.createElement("td"); 
     numberCell.textContent = index + 1;

    let descriptionCell = document.createElement("td"); 
     descriptionCell.textContent = transaction.description;
     
     let typeCell = document.createElement("td"); 
     typeCell.textContent = transaction.type;

    let amountCell = document.createElement("td"); 
     amountCell.textContent = transaction.amount;

     let dateCell = document.createElement("td");
        dateCell.textContent = transaction.date;
     
   let actionCell = document.createElement("td");

           let deletebtn = document.createElement("button");
            deletebtn.textContent = "DELETE";

            deletebtn.addEventListener("click" ,function(event){
               
               const originalIndex = transactions.indexOf(transaction);
               transactions.splice(originalIndex, 1);

               localStorage.setItem("transactions" , JSON.stringify(transactions));

                renderTransactions();
                updateSummary();
            });

     actionCell.append(deletebtn);

     tableRow.append(numberCell);
     tableRow.append(descriptionCell);
     tableRow.append(typeCell);
     tableRow.append(amountCell);
     tableRow.append(dateCell);
     tableRow.append(actionCell);

    tableList.appendChild(tableRow);

   
   });

}
  
renderTransactions();
updateSummary();

          
