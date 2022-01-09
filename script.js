const select = document.createElement("select");
const option = document.createElement("option");
const div1 = document.createElement("div");
const div2 = document.createElement("div");


const getData = () => {
  return fetch("cars.json")
    .then((response) => response.json())
    .catch((error) => console.error(error.message));
};

const makeElement = (elem) => {
  document.body.append(select);
  option.textContent = "Выберите тачку";
  select.append(option);
  div1.textContent = "Выберите тачку";
  select.after(div1);
  div2.textContent = "";
  div1.after(div2);

  elem.then((data) => {
    data.cars.forEach((car) => {
      const newOption = document.createElement("option");
      newOption.textContent = car.brand;
      select.append(newOption);
    });
  }).catch((error) => console.log(error.message));

};

const changeCar = (elem) => {
  if (select.value == "Выберите тачку") {
    div1.textContent = select.value;
  } else {
    elem
    .then((data) => {
      const car = data.cars[select.selectedIndex - 1];
      div1.textContent = `Тачка ${car.brand} ${car.model}`;
      div2.textContent = `Цена: ${car.price} $`;
    }).catch((error) => console.log(error.message));
  }
};

try {
  if (!select) {
    throw new Error("Верните селект!");
  }
  makeElement(getData());
  select.addEventListener("change", () => {
    changeCar(getData());
  });
} catch (error) {
  console.log(error.message);
}
