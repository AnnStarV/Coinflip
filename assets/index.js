document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.burger-menu');
  const toggleSidebar = () => sidebar.classList.toggle('open');

  document.querySelector('.burger-icon').addEventListener('click', toggleSidebar);
  document.querySelector('.logo-wrapper .back').addEventListener('click', toggleSidebar);

  // const coins = ['bitcoin', 'ethereum', 'cardano', 'wax', 'polkadot'];
  // const vs_currency = 'usd'; 
  // const days = 90; 

  // async function getPrices() {
  //   const result = {};

  //   for (let coin of coins) {
  //     try {
  //       const response = await fetch(
  //         `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`
  //       );
  //       const data = await response.json();

  //       const prices = data.prices.map(entry => entry[1]); 
  //       const pastMonthPrices = []; 
  //       const prePastMonthPrices = [];

  //       for (let i = 0; i < 30; i += 7) {
  //         prePastMonthPrices.push(prices[i]);
  //       }
  //       for (let i = 30; i < 60; i += 7) {
  //         pastMonthPrices.push(prices[i]); 
  //       }

  //       const currentPrice = prices[prices.length - 1];

  //       result[coin] = {
  //         currentPrice,       
  //         pastMonthPrices,   
  //         prePastMonthPrices,
  //       };
  //     } catch (error) {
  //       console.error(`Ошибка при получении данных для ${coin}:`, error);
  //     }
  //   }

  //   console.log(result);
  // }

  // getPrices();
  const obj =
  {
    "bitcoin": {
      "currentPrice": 56720.45,
      "pastMonthPrices": [54100.30, 54500.75, 55200.12, 55800.45],
      "prePastMonthPrices": [52300.65, 52600.12, 53050.45, 53500.20]
    },
    "ethereum": {
      "currentPrice": 4210.12,
      "pastMonthPrices": [4100.25, 4125.60, 4180.10, 4230.45],
      "prePastMonthPrices": [3970.20, 3995.12, 4030.75, 4065.50]
    },
    "cardano": {
      "currentPrice": 1.89,
      "pastMonthPrices": [1.75, 1.78, 1.82, 1.85],
      "prePastMonthPrices": [1.65, 1.68, 1.72, 1.74]
    },
    "wax": {
      "currentPrice": 0.99,
      "pastMonthPrices": [0.95, 0.97, 0.98, 0.99],
      "prePastMonthPrices": [0.92, 0.93, 0.94, 0.95]
    },
    "polkadot": {
      "currentPrice": 42.50,
      "pastMonthPrices": [40.50, 41.00, 41.75, 42.00],
      "prePastMonthPrices": [39.00, 39.50, 40.00, 40.50]
    }
  }



  function generateGraphic(field) {
    let currentPrice = obj[field].currentPrice;
    let monthPrices = obj[field].pastMonthPrices.concat(obj[field].prePastMonthPrices);
    monthPrices.push(obj[field].currentPrice);
    let firstPrice = obj[field].prePastMonthPrices[0];
    console.log(monthPrices);
    let percentChange = (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(2);

    document.querySelector(`.${field}-current-price p`).innerText = `$${currentPrice.toLocaleString()}`;
    document.querySelector(`.${field}-percent p`).innerText = `${percentChange > 0 ? '+' : '-'}${percentChange}%`;
    percentChange >= 0 ? document.querySelector(`.${field}-percent`).classList.add('green-stat') : document.querySelector('.${field}-percent').classList.add('red-stat');
    
    let ctx = document.getElementById(`${field}Chart`).getContext('2d');
    

    let gradient = ctx.createLinearGradient(0, 0, 400, 0);
    gradient.addColorStop(0, 'rgba(147, 63, 254, 1)');
    gradient.addColorStop(0.5, 'rgba(24, 200, 255, 1)');
    gradient.addColorStop(1, 'rgba(147, 63, 254, 1)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(9).fill(''),
        datasets: [{
          data: monthPrices,
          borderColor: gradient,
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: {
          line: { borderJoinStyle: 'round' }
        }
      }
    });
  }

  const cryptocurrencies = Object.keys(obj);

  cryptocurrencies.forEach(element => {
    generateGraphic(element);
  });

});