let allExpenses = [];
let valueNameShop = '';
let valueCost = '';
let nameShop = null;
let cost = 0;

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
    Data: data(),
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

    const containBut = document.createElement('div');
    containBut.className = 'container-button';

    const textNameShop = document.createElement('p');
    textNameShop.className = 'text-name-shop'
    textNameShop.innerText = `${index + 1}) ${item.textNameShop}`;
    container.appendChild(textNameShop);

    const date = document.createElement('p');
    date.className = 'date';
    date.innerText = `${data()}`;
    container.appendChild(date);

    const numberCost = document.createElement('p');
    numberCost.className = 'text-cost';
    numberCost.innerText = `${item.textCost} р.`;
    container.appendChild(numberCost);

    const buttonEdit = document.createElement('input');
    buttonEdit.type = 'image';
    buttonEdit.src = 'images/edit.png'
    buttonEdit.className = 'button';
    containBut.appendChild(buttonEdit);

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

    countCost += Number(item.textCost);

    container.appendChild(containBut);
    content.appendChild(container);
  });

  expenses.innerText = `${countCost} р.`;
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

  return `${day}-${month}-${year}`;
}