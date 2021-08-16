let allTask = [];
let valueNameShop = '';
let valueCost = '';
let nameShop = null;
let cost = 0;

const buttonAdd = document.createElement('button');
buttonAdd.className = 'button-add';
buttonAdd.textContent = 'Добавить';

const mainElemets = document.querySelector('.main-elements');
mainElemets.appendChild(buttonAdd);

window.onload = init = () =>  {
  nameShop = document.querySelector('.shop');
  nameShop.addEventListener('change', updateNameShop);
  cost = document.querySelector('.cost');
  cost.addEventListener('change', updateCost);

  render();
}

buttonAdd.onclick = () => {
  valueNameShop = valueNameShop.trim();

  if (!valueNameShop || !valueCost) {
    nameShop.value = '';
    return (alert ('ERROR'));
  }

  allTask.push({
    textNameShop: valueNameShop,
    textCost: valueCost,
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
  const content = document.querySelector('.content-page');
  let count = 1;

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTask.forEach((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task';

    const containBut = document.createElement('div');
    containBut.className = 'container-button';

    const textNameShop = document.createElement('p');
    textNameShop.className = 'text-name-shop'
    textNameShop.innerText = `${count}) ${item.textNameShop} ${data()}`;
    container.appendChild(textNameShop);

    ++count;

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
    buttonDelete.src = 'images/delete.png'
    buttonDelete.className = 'button';
    containBut.appendChild(buttonDelete);

    container.appendChild(containBut);
    content.appendChild(container);
  });
}

const data = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  if (day < 10) {
    day = `0${day}`;
  };

  if (month < 10) {
    month = `0${month}`;
  };

  return `${day}-${month}-${year}`;
}