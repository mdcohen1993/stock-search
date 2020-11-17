
    class BuildMarquee {
    constructor(id) {
        let marqueeList = document.createElement('ul');
        marqueeList.className += " marquee"
        id.appendChild(marqueeList);
        id.style.overflow = 'hidden'
        marqueeList.style.width = '100vw';
        marqueeList.style.height = '100%';
        marqueeList.style.display = 'flex';
        marqueeList.style.listStyle = 'none';
        marqueeList.style.justifyContent = 'space-between'
        marqueeList.animate([
            { transform: 'translateX(0)' }, 
            { transform: 'translateX(-180vw)' }
          ], { 
            duration: 100000,
            iterations: Infinity
          });

        let appendLi = () => {
            fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (let i = 0; i < data.length; i++) {
                        let element = document.createElement('li');
                        element.className += " ticker"
                        let elPrice = document.createElement('li')
                        elPrice.className += " price"

                        let symbol = data[i].symbol;
                        let price = data[i].price.toFixed(2);
                        element.innerHTML = `${symbol}`;
                        elPrice.innerHTML = `$${price}`;
                        marqueeList.appendChild(element);
                        marqueeList.appendChild(elPrice);
                    }

                });
        };
        appendLi();
    }
}

