const goods = [
{ title: 'Shirt', price: 150},
{ title: 'Socks', price: 100},
{ title: 'Jacket', price: 350},
{ title: 'Shoes', price: 250},
];

const  renderGoodsItem = ({title, price} = {}) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
  // п.3 методички: запятая между элементами корзины из-за того, что map создает новый массив, а
  // toString склеивает элементы массива в строку через запятую. Поэтому добавим join(""),
  // чтобы убрать ненужные нам запятые в верстке

  // п.2 методички - добавил значения по умолчанию и типа немного упростил. Теперь независимо от того,
  // как будет расширяться функция renderGoodItem, в вызывающем ее коде не надо будет дописывать везде
  // новые параметры. Все что есть в передаваемом объекте она возьмет сама за счет деструктуризации.
  // Остается вопрос, как передать туда сразу текущий item, не указывая его (навевает сюда bind, но
  // не соображу пока как прикрутить)
  let goodsList = list.map(item => renderGoodsItem(item)).join("");
  document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList(goods);
