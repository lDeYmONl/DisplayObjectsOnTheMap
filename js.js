$(document).ready(function ($) {
  const listItemImgPath = "./images/car.png",
    markerActivePath = "./libraries/leaflet/images/marker-icon-active.png",
    markerInActivePath = "./libraries/leaflet/images/marker-icon.png";

  const listSearch = $("#list__search"),
    listContent = $("#list__content");

  //статичний масив із вхідними даними
  const objectMapArray = [
    {
      id: 1,
      latitude: 50.760918,
      longitude: 4.11017,
      name: "ВАЗ",
    },
    {
      id: 2,
      latitude: 47.492647,
      longitude: 19.051399,
      name: "ГАЗель",
    },
    {
      id: 3,
      latitude: 41.902689,
      longitude: 12.496176,
      name: "Lexus",
    },
    {
      id: 4,
      latitude: 43.779787,
      longitude: 11.265817,
      name: "Volkswagen",
    },
    {
      id: 5,
      latitude: 52.373057,
      longitude: 4.892557,
      name: "Lada",
    },
    {
      id: 6,
      latitude: -22.90315,
      longitude: -43.189903,
      name: "Kia",
    },
    {
      id: 7,
      latitude: 38.716174,
      longitude: -9.141589,
      name: "Bentli",
    },
    {
      id: 8,
      latitude: 50.080293,
      longitude: 14.428983,
      name: "Porche",
    },
    {
      id: 9,
      latitude: 48.856663,
      longitude: 2.351556,
      name: "BMW",
    },
    {
      id: 10,
      latitude: 45.438095,
      longitude: 12.319029,
      name: "Honda",
    },
  ];

  //ініціалізуєм карту
  const map = L.map("map").setView([50, 10], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let marker, listItem, lastElement;

  //формуєм список об'єктів, а також виводим їх на карту
  objectMapArray.map((objectElement) => {
    createListItem(objectElement);

    marker = L.marker([objectElement.latitude, objectElement.longitude]).addTo(
      map
    );
    marker._icon.id = objectElement.id;
  });

  //----------------------------------
  listSearch.on("input", function () {
    listContent.empty();
    objectMapArray
      .filter((objectElement) => {
        return objectElement.name
          .toLowerCase()
          .startsWith(this.value.toLowerCase());
      })
      .map((objectElement) => {
        createListItem(objectElement);
      });
  });

  function createListItem(objectElement) {
    //створення елементів для списку об'єктів

    //дана конструкція створення елементів доступна з версії jQuery 1.4
    listItem = jQuery("<div>", {
      class: "list__item",
      id: objectElement.id,
    }).appendTo(listContent);

    listItem.on("click", onListItemClick);

    jQuery("<img>", {
      class: "list__img",
      src: listItemImgPath,
    }).appendTo(listItem);

    jQuery("<p>", {
      class: "list__name",
    })
      .text(objectElement.name)
      .appendTo(listItem);
  }

  function onListItemClick(e) {
    // обробка натиску на об'єкт у списку

    if (lastElement) {
      lastElement.attr("src", markerInActivePath);
    }

    //змінюєм стан активного маркера
    $(".list__item_active").removeClass("list__item_active");
    $(e.target).addClass("list__item_active");

    const idItem = e.target.getAttribute("id");
    lastElement = $("#map")
      .find(`[id=${idItem}]`)
      .attr("src", markerActivePath);

    // шукаєм координати маркера по ід та центруєм на ньому карту
    let itemElement = objectMapArray.find((itemElement) => {
      return itemElement.id == idItem;
    });

    if (itemElement)
      map.setView([itemElement.latitude, itemElement.longitude], 10);
  }
});
