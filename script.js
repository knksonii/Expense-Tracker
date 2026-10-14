const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const incomeInput = document.getElementById("income");
const expenseInput = document.getElementById("expense");
const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");




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

     
      const transaction = {
           description: description,
           amount: amount,
           type: type
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
         
        totalIncome.textContent = income;
         totalExpenses.textContent = expenses;
         totalBalance.textContent = balance;
 
        }





function renderTransactions() {
          let tableList = document.getElementById("transactionList");

          tableList.innerHTML = "";

transactions.forEach(function(transaction, index) {


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
        const today= new Date ();
      dateCell.textContent = today.toLocaleDateString();
     
   let actionCell = document.createElement("td");

           let deletebtn = document.createElement("button");
            deletebtn.textContent = "DELETE";

            deletebtn.addEventListener("click" ,function(event){
               
               transactions.splice(index,1);

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

          
