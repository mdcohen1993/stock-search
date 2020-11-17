let searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
let searchResults = document.getElementById('searchResults')
let loadSpinner = document.getElementById('spinner')
let compImg = document.getElementById('compImg')
let compName = document.getElementById('compName')
let compDescrip = document.getElementById('compDescrip')
let compWebsite = document.getElementById('compWebsite')

if (loadSpinner != null) {
    loadSpinner.style.display = 'none'
}
function showTenResults(searchInput) {
    loadSpinner.style.display = 'flex'
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            searchResults.innerHTML = ""
            for (let i = 0; i < 11; i++) {
                let stockSymbol = data[i].symbol;
                let stockName = data[i].name;
                fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stockSymbol}`)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (d) {
                        let changesPercentage = d.profile.changesPercentage
                        let option = document.createElement('a');
                        option.classList.add('list-group-item')
                        option.href = `/company.html?symbol=${stockSymbol}`
                        let linkTxt = `${stockName} (${stockSymbol}) ${changesPercentage}`;
                        option.innerHTML = `${linkTxt}`
                        let divTxt = option.innerHTML;
                        let searchTxt = searchInput
                        searchTxt.toString();
                        searchTxt = searchTxt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        let re = new RegExp(searchTxt, 'gi');
                        if (searchInput.length > 0){
                        option.innerHTML = divTxt.replace(re, '<mark>$&</mark>');
                        console.log(option.innerHTML)
                        }
                        else option.innerHTML = divTxt;

                        let stockImg = document.createElement('img');
                        stockImg.src = `https://financialmodelingprep.com/images-New-jpg/${stockSymbol}.jpg`
                        searchResults.appendChild(option)
                        option.appendChild(stockImg)
                        loadSpinner.style.display = 'none'
                    })
            }
        })
}

if (searchBtn != null) {
    searchBtn.addEventListener('click', function (e) {
        showTenResults(String(searchInput.value))
    })
}
function showCompanyProfile() {
    let urlParam = new URLSearchParams(window.location.search)
    urlParamString = urlParam.toString()
    urlParam = urlParamString.split('=').pop()
    urlParam = urlParam.toString();
    console.log(urlParam)
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${urlParam}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            compImg.src = `https://financialmodelingprep.com/images-New-jpg/${urlParam}.jpg`
            compName.innerHTML = data.profile.companyName;
            compDescrip.innerHTML = data.profile.description;
        })
}

if(searchBtn != null){
    window.addEventListener('load', function(e){
        new BuildMarquee(marqueeContainer)
    })
}

window.addEventListener('load', function (e) {
    showCompanyProfile()
})