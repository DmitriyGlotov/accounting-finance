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

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTask.forEach((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task';

    const containBut = document.createElement('div');
    containBut.className = '.container-button';

    const textNameShop = document.createElement('p');
    textNameShop.innerText = item.textNameShop;
    container.appendChild(textNameShop);

    const numberCost = document.createElement('p');
    numberCost.innerText = item.textCost;
    container.appendChild(numberCost);

    const buttonEdit = document.createElement('button');
    buttonEdit.className = 'button-edit';
    buttonEdit.textContent = 'Изменить';
    containBut.appendChild(buttonEdit);

    const buttonDelete = document.createElement('button');
    buttonDelete.className = 'button-delete';
    buttonDelete.textContent = 'Удалить';
    containBut.appendChild(buttonDelete);

    container.appendChild(containBut);
    content.appendChild(container);
  });
}