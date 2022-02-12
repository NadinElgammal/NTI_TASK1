const customerData = ["accNum", "name", "balance", "transactions"]
const transactionToCustomer = ["withdraw","addBalance" ]
const addCustomer = document.querySelector("#addCustomer")  
const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")

const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent) myElement.textContent = element.textContent
        if (element.classes) myElement.classList = element.classes  
        element.attributes.forEach(attribute => {
        myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    }
    catch (e) {
        console.log(e)
    }
}   
const elementCreator = (element, parent, customerData, classes, attributes) => {
    return { element, parent, customerData, classes, attributes }
}

//////////////    read from local    /////////////////
const readFromlocal = (Item) => {
let data 
try{
  const data = JSON.parse(localStorage.getItem(Item))
  if(!Array.isArray(data)) throw new Error("IS NOT ARRAY")
}
catch(e){
    //console.log(e.message)
    data = []
}
return data
}
console.log(readFromlocal("task"))

//////////////////  write in local ////////////////////////

const writeTolocal = (Item , data) => {
   localStorage.setItem(Item, JSON.stringify(data))
}

// draw Customer Data

const drawCustomerData = (customerData,index) => {
    const tr = createMyOwnElement(elementCreator("tr", datawrap, null, null, []))
    createMyOwnElement(elementCreator("td", tr, customerData.accNum, null, []))
    createMyOwnElement(elementCreator("td", tr, customerData.name, null, []))
    createMyOwnElement(elementCreator("td", tr, customerData.balance, null, []))
    createMyOwnElement(elementCreator("td", tr, customerData.transactions, null, []))
    const td = createMyOwnElement(elementCreator("td", tr, null, null, []))
    const singleBtn = createMyOwnElement(
        elementCreator("button", td, "Show", "btn btn-success mx-3", [])
    )
    singleBtn.addEventListener("click", ()=> showElement(task))
    const editBtn = createMyOwnElement(
        elementCreator("a", td, "Edit", "btn btn-warning mx-3", [{ key: "href", val: "edit.html" }])
    )
    //<button id="delete" class="btn btn-danger mx-3">Delete</a>
    const delBtn = createMyOwnElement(
        elementCreator("button", td, "delete", "btn btn-danger mx-3", [])
    )
    delBtn.addEventListener("click", ()=>deleteItem(index))
}
const deleteItem = (index)=>{
    const customer = readFromStorage("data")
    customer.splice(index,1)
    writeTolocal("data", customer)
    drawAllCustomers(customer)
}
const editElement=(task)=>{
    writeTolocal("task", task)
    window.location.href="edit.html"
}
const drawEmptyRow = (colSpan) => {
    const tr = createMyOwnElement(elementCreator("tr", datawrap, null, "alert alert-danger", []))
    createMyOwnElement(elementCreator("td", tr, "no tasks yet", "text-center", [{ key: "colspan", val: colSpan }]))
}
const drawAllCustomers = (customers) => {
    datawrap.customerData = ""
    if (customers.length == 0) drawEmptyRow(4)
    customers.forEach((customer, i) => drawCustomerData(customer, i))
}
const drawTransactionTypes = (transactionTypes)=>{
    transactionTypes.forEach(transTypes => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#tType"), transTypes, null, [{ key: "value", val: transTypes }]))
    })
}

if(addCustomer){
transactionToCustomer.forEach(tCustomer=>{
    let ele= {
        element:"option",
        parent:document.querySelector("#tCustomer"),
        textContent:tCustomer,
        classes:null,
        attributes:[{key:"value", val:tCustomer}]
    }
    createMyOwnElement(ele)
})


addCustomer.addEventListener("submit", function(e){
    e.preventDefault()
    let task = { id: Date.now() }
    customerData.forEach( head => task[head] = addCustomer.elements[head].value)
    console.log(task)
    const tasks = readFromlocal("tasks")
    tasks.push(task)
    writeTolocal("data" , tasks)
    addCustomer.reset()
    console.log(tasks)

})
}   

//const datawrap = document.querySelector("#datawrap")
if (datawrap) {
    drawAllCustomers( readFromlocal("tasks") )
    delAll.addEventListener("click", (event) => {
        writeTolocal("tasks", [])
        drawAllCustomers([])
    })
}