export const getDishById = (id: number) => {
  const meals = restaurant.food.flatMap((category) => category.meals);
  return meals.find((meal) => meal.id === id);
};

export const restaurant = {
  name: 'Vapiano',
  rating: '4.5 Erinomainen',
  ratings: '(500+)',
  img: require('../../assets/data/r1.jpeg'),
  distance: '1.37 km päässä',
  delivery: '10-20 min',
  tags: ['Italialainen', 'Pizza', 'Pasta', 'Salaatit', 'Vegan', 'Alkoholi', 'Viini', 'Vegaaninen'],
  about: 'Käsintehty tuore pasta, ohuet pizzat, proteiinipitoiset salaatit, kotitekoiset kastikkeet ja mausteet. Valitse pastan muoto ja lisää haluamiasi täytteitä.',
  food: [
    {
      category: 'Ruokatarjoukset',
      meals: [
        {
          id: 1,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Sisältää yhden valkosipulileivän, yhden pastan ja yhden virvoitusjuoman.',
          img: require('../../assets/data/1.png'),
        },
        {
          id: 2,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Sisältää yhden valkosipulileivän, yhden kasvispastan ja yhden virvoitusjuoman.',
          img: require('../../assets/data/2.png'),
        },
        {
          id: 3,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Sisältää yhden valkosipulileivän (juustolla tai ilman), valinnan kahdesta pizzasta, yhden pullon viiniä tai neljä pulloa Morettia.',
          img: require('../../assets/data/3.png'),
        },
        {
          id: 4,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Sisältää kaksi valkosipulileipää (juustolla tai ilman), neljä pizzaa, kaksi pulloa viiniä tai kahdeksan pulloa olutta tai molempia.',
          img: require('../../assets/data/4.png'),
        },
      ],
    },
    {
      category: 'Pasta',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Tomaattikastike, chili, valkosipuli ja sipuli',
          img: require('../../assets/data/5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Tomaattikastike, sipuli, mozzarella',
          img: require('../../assets/data/6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'Salame',
          price: 11.35,
          info: 'Mausteinen italialainen makkara, tomaattikastike, mozzarella',
          img: require('../../assets/data/7.png'),
        },
        {
          id: 8,
          name: 'Margherity',
          price: 9.75,
          info: 'Tomaattikastike, mozzarella',
          img: require('../../assets/data/8.png'),
        },
      ],
    },
    {
      category: 'Salaatti',
      meals: [
        {
          id: 9,
          name: 'Insalata Mista Piccola',
          price: 5.99,
          info: 'Sekalehtinen salaatti, kirsikkatomaatit ja raastettu porkkana. Ei voi vaihtaa, mutta jos haluat lisätä täytteitä, voit tehdä sen alla.',
          img: require('../../assets/data/9.png'),
        },
        {
          id: 10,
          name: 'Insalata Mista della Casa',
          price: 8.95,
          info: 'Suuri sekasalaatti. Ei voi vaihtaa, mutta jos haluat lisätä täytteitä, voit tehdä sen alla.',
          img: require('../../assets/data/10.png'),
        },
      ],
    },
    {
      category: 'Ruokatarjoukset',
      meals: [
        {
          id: 1,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Sisältää yhden valkosipulileivän, yhden pastan ja yhden virvoitusjuoman.',
          img: require('../../assets/data/1.png'),
        },
        {
          id: 2,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Sisältää yhden valkosipulileivän, yhden kasvispastan ja yhden virvoitusjuoman.',
          img: require('../../assets/data/2.png'),
        },
        {
          id: 3,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Sisältää yhden valkosipulileivän (juustolla tai ilman), valinnan kahdesta pizzasta, yhden pullon viiniä tai neljä pulloa Morettia.',
          img: require('../../assets/data/3.png'),
        },
        {
          id: 4,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Sisältää kaksi valkosipulileipää (juustolla tai ilman), neljä pizzaa, kaksi pulloa viiniä tai kahdeksan pulloa olutta tai molempia.',
          img: require('../../assets/data/4.png'),
        },
      ],
    },
    {
      category: 'Pasta',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Tomaattikastike, chili, valkosipuli ja sipuli',
          img: require('../../assets/data/5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Tomaattikastike, sipuli, mozzarella',
          img: require('../../assets/data/6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'Salame',
          price: 11.35,
          info: 'Mausteinen italialainen makkara, tomaattikastike, mozzarella',
          img: require('../../assets/data/7.png'),
        },
        {
          id: 8,
          name: 'Margherity',
          price: 9.75,
          info: 'Tomaattikastike, mozzarella',
          img: require('../../assets/data/8.png'),
        },
      ],
    },
    {
      category: 'Salaatti',
      meals: [
        {
          id: 9,
          name: 'Insalata Mista Piccola',
          price: 5.99,
          info: 'Sekalehtinen salaatti, kirsikkatomaatit ja raastettu porkkana. Ei voi vaihtaa, mutta jos haluat lisätä täytteitä, voit tehdä sen alla.',
          img: require('../../assets/data/9.png'),
        },
        {
          id: 10,
          name: 'Insalata Mista della Casa',
          price: 8.95,
          info: 'Suuri sekasalaatti. Ei voi vaihtaa, mutta jos haluat lisätä täytteitä, voit tehdä sen alla.',
          img: require('../../assets/data/10.png'),
        },
      ],
    },
  ],
};
