let allExpenses = [];
let valueNameShop = '';
let valueCost = '';
let nameShop = null;
let cost = 0;
let date = '';

const buttonAdd = document.createElement('button');
buttonAdd.className = 'button-add';
buttonAdd.textContent = 'Добавить';

const mainElemets = document.querySelector('.main-elements');
mainElemets.appendChild(buttonAdd);

window.onload = init = async () =>  {
  nameShop = document.querySelector('.shop');
  nameShop.addEventListener('change', updateNameShop);
  cost = document.querySelector('.cost');
  cost.addEventListener('change', updateCost);

  const resp = await fetch('http://localhost:8000/allExpenses', {
    method: 'GET'
  });
  const result = await resp.json();
  allExpenses = result.data;

  render();
}

buttonAdd.onclick = async () => {
  valueNameShop = valueNameShop.trim();

  if (!valueNameShop || !valueCost) {
    nameShop.value = '';
    return (alert ('ERROR'));
  }

  allExpenses.push({
    textNameShop: valueNameShop,
    textCost: valueCost,
    Data: date,
    checkButtEdit: false,
    dateFlag: false,
  });

  const resp = await fetch('http://localhost:8000/createExpenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      textNameShop: valueNameShop,
      textCost: valueCost,
      Data: data(),
    })
  });
  const result = await resp.json();
  allExpenses = result.data;

  valueNameShop = '';
  nameShop.value = '';

  valueCost = '';
  cost.value = '';

  render();

}

const updateNameShop = (event) => valueNameShop = event.target.value;

const updateCost = (event) => { valueCost = event.target.value; }

const render = () => {
  let countCost = 0;
  const content = document.querySelector('.content-page');
  const expenses = document.querySelector('.total');

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allExpenses.forEach((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task';

    if (!allExpenses[index].checkButtEdit) {
      const containBut = document.createElement('div');
      containBut.className = 'container-button';

      createElement(container, index, item);

      createButtEdit(containBut, index);

      createButtDelete(containBut, index);

      container.appendChild(containBut);
    } else {
      const containBut = document.createElement('div');
      containBut.className = "container-button";

      const inputName = document.createElement('input');
      inputName.className = "input-fixed";
      inputName.value = allExpenses[index].textNameShop;
      container.appendChild(inputName);

      const inputData = document.createElement('input');
      inputData.type = 'date';
      inputData.format = 'yyyy-mm-dd';
      inputData.className = "input-fixed";
      inputData.value = allExpenses[index].Data;
      container.appendChild(inputData);

      const inputCost = document.createElement('input');
      inputCost.className = "input-fixed";
      inputCost.type = Number;
      inputCost.value = allExpenses[index].textCost;
      container.appendChild(inputCost);

      createButtonDone(containBut, inputName, inputData, inputCost, index);

      createButtonCancel(containBut, index);

      container.appendChild(containBut);
    }

    countCost += Number(item.textCost);

    content.appendChild(container);
  });

  expenses.innerText = `${countCost} р.`;
}


const createElement = (container, index, item) => {
  const textNameShop = document.createElement('p');
  textNameShop.className = 'text-name-shop'
  textNameShop.innerText = `${index + 1}) ${item.textNameShop}`;
  container.appendChild(textNameShop);

  const date = document.createElement('p');
  date.className = 'date';
  date.innerText = allExpenses[index].Data;
  container.appendChild(date);

  const numberCost = document.createElement('p');
  numberCost.className = 'text-cost';
  numberCost.innerText = `${item.textCost} р.`;
  container.appendChild(numberCost);
}

const createButtEdit = (containBut, index) => {
  const buttonEdit = document.createElement('input');
  buttonEdit.type = 'image';
  buttonEdit.src = 'images/edit.png'
  buttonEdit.className = 'button';

  buttonEdit.onclick = () => {
    allExpenses[index].checkButtEdit = true;

    render();
  }

  containBut.appendChild(buttonEdit);
}

const createButtDelete = (containBut, index) => {
  const buttonDelete = document.createElement('input');
  buttonDelete.type = 'image';
  buttonDelete.src = 'images/delete.png';
  buttonDelete.className = 'button';

  buttonDelete.onclick = async () => {
    const resp = await fetch(`http://localhost:8000/deleteExpenses?_id=${allExpenses[index]._id}`, {
      method: 'DELETE'
    });
    const result = await resp.json();
    allExpenses = result.data;

    render();
  }
  containBut.appendChild(buttonDelete);
}

const createButtonDone = (containBut, inputName, inputData, inputCost, index) => {
  const butDone = document.createElement('input');
  butDone.className = 'button';
  butDone.type = 'image';
  butDone.src = 'images/done.png';

  butDone.onclick = async () => {
    checkButt = false;
    inputName.value = inputName.value.trim();
    inputData.value = inputData.value.trim();
    inputCost.value = inputCost.value.trim();

    if (inputName.value && inputData.value && inputCost.value) {
      allExpenses[index].textNameShop = inputName.value;
      allExpenses[index].textCost = inputCost.value;
      allExpenses[index].Data = inputData.value;
      const { _id, textNameShop, textCost, Data } = allExpenses[index];

      const resp = await fetch('http://localhost:8000/changeExpensesInfo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ _id, textNameShop, textCost, Data })
      });
      const result = await resp.json();
      allExpenses = result.data;
    }

    render();
  }

  containBut.appendChild(butDone);
}

const createButtonCancel = (containBut, index) => {
  const butCanc = document.createElement('input');
  butCanc.className = 'button';
  butCanc.type = 'image';
  butCanc.src = 'images/cancel.png';

  butCanc.onclick = () => {
    allExpenses[index].checkButtEdit = false;

    render();
  }

  containBut.appendChild(butCanc);
}

const data = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-${day}`;
}