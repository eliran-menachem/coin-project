window.onload = function () {
    ajaxFunc()
}
//********************UI****************************//
// Get home NAV page
let homePageNav = document.getElementById('homeNav');
homePageNav.addEventListener('click', moveToHomePage);
// Get reports NAV page
let reportsPageNav = document.getElementById('reportsNav');
reportsPageNav.addEventListener('click', moveToLiveReportsPage);

// Get about NAV page
let aboutPageNav = document.getElementById('aboutNav');
aboutPageNav.addEventListener('click', moveToAboutPage);

// Get Home Page
let homePage = document.getElementById('home');

// Get live reports Page
let reportsPage = document.getElementById('reports');

// Get about Page
let aboutPage = document.getElementById('about');

// Get search button
const btnSearch = document.getElementById("btn_search");

//Create Arr for cards that clicked
let arrCoinsClicked = [];

let localStorageArr = [];
let arrCoinsSymbol = [];
let arrPriceOfCoin = [];



// Create cards 
function createCard(coin) {
    let div_wrapper_card = document.createElement("div");
    div_wrapper_card.classList.add('col-md-4', 'card', 'p-4');
    div_wrapper_card.id = `${coin.id}`;

    let div_first_row = document.createElement('div');
    div_first_row.classList.add('row', 'mt-2');

    let div_title = document.createElement('div');
    div_title.classList.add('col-md-8');

    let h2_title = document.createElement('h2');
    h2_title.innerHTML = `${coin.symbol}`

    let div_switch_btn = document.createElement('div');
    div_switch_btn.classList.add('col-md-2');

    let label_of_switch = document.createElement('label');
    label_of_switch.classList.add('switch');

    let input_inside_label_switch = document.createElement('input');
    input_inside_label_switch.setAttribute("type", "checkbox");

    // Add class to button that clicked
    input_inside_label_switch.addEventListener("click", function (e) {
        if (input_inside_label_switch.classList.contains('play')) {
            input_inside_label_switch.classList.remove('play');
            removeCoinFromArr(e)
            removeSymbolFromArr(e)
        }
        else {
            input_inside_label_switch.classList.add('play');
            puseCoinToArr(e);
            setSymbolCoinInArr(e)


        }
    })

    let span_inside_label_switch = document.createElement('span');
    span_inside_label_switch.classList.add('slider', 'round');

    let div_second_row = document.createElement('div');
    div_second_row.classList.add('row', 'mt-2');

    let p_inside_second_row = document.createElement('p');
    p_inside_second_row.innerHTML = `${coin.name}`

    let div_third_row = document.createElement('div');


    let div_btn_more_info = document.createElement('btn');


    // Add more info about the coin
    div_btn_more_info.addEventListener("click", function () {
        getDataOnCoin(coin, event)
    });

    div_btn_more_info.classList.add('btn', 'btn-info', 'btn_more_info', 'accordion');
    div_btn_more_info.textContent = 'More Info';

    let div_more_info = document.createElement('div');
    div_more_info.classList.add('panel');
    div_more_info.id = `${coin.id}btn`;

    let imgMoreInfo = document.createElement("img");

    let img_gif = document.createElement("img");
    div_more_info.appendChild(img_gif);
    img_gif.src = 'https://media.giphy.com/media/xThuWt89yRv9xkJyco/giphy.gif';

    div_wrapper_card.appendChild(div_first_row);
    div_wrapper_card.appendChild(div_second_row);
    div_wrapper_card.appendChild(div_third_row);

    div_wrapper_card.appendChild(div_more_info);
    div_more_info.appendChild(imgMoreInfo);
    div_first_row.appendChild(div_title);
    div_first_row.appendChild(div_switch_btn);
    div_title.appendChild(h2_title);
    div_switch_btn.appendChild(label_of_switch);
    label_of_switch.appendChild(input_inside_label_switch);
    label_of_switch.appendChild(span_inside_label_switch);
    div_second_row.appendChild(p_inside_second_row);
    div_third_row.appendChild(div_btn_more_info);

    return div_wrapper_card;
}// End of function createCard


// Use api to get info about some coins
function ajaxFunc() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        type: "GET",
        success: function (res) {
            let arr_coins = res;
            setCoins(arr_coins);
        },
        error: function (xhr) {
            console.log("Error:", xhr);
        }
    });
}// End of function ajaxFunc

// Function - set coin on site
function setCoins(arr_coins) {
    console.log(arr_coins);
    for (let i = 0; i < 10; i++) {
        let getCard = createCard(arr_coins[i]);
        document.getElementById('wrapperOfCards').appendChild(getCard);
    }// End of for loop 
}// End of set coins on cards

// Show live reports page and hide others page
function moveToLiveReportsPage(e) {

    reportsPage.setAttribute("style", "display:block")
    homePage.setAttribute("style", "display:none")
    aboutPage.setAttribute("style", "display:none")
    canvasjs();


}
// Show About Page reports page and hide others page
function moveToAboutPage(e) {
    console.log(e.target.parentElement);
    reportsPage.setAttribute("style", "display:none")
    homePage.setAttribute("style", "display:none")
    aboutPage.setAttribute("style", "display:block")

}
// Show HomePage reports page and hide others page
function moveToHomePage(e) {
    reportsPage.setAttribute("style", "display:none")
    homePage.setAttribute("style", "display:block")
    aboutPage.setAttribute("style", "display:none")
}

function puseCoinToArr(e) {

    let idOfCoinThetClicked = e.target.parentElement.parentElement.parentElement.parentElement.id
    if (arrCoinsClicked.length < 5) {
        for (let i = 0; i < 5; i++) {
            if (arrCoinsClicked[i] !== idOfCoinThetClicked) {
                arrCoinsClicked.push(idOfCoinThetClicked);
                break;
            }
        }
        console.log(arrCoinsClicked);
        return;
    }

    alert('You can generate a report for only 5 coins! Please remove currency');
    limitOfSelectedCoin(e)
}

function setSymbolCoinInArr(e) {
    let sybolOfCoin = e.target.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    if (arrCoinsSymbol.length < 5) {

        for (let i = 0; i < 5; i++) {

            if (arrCoinsSymbol[i] !== sybolOfCoin) {
                arrCoinsSymbol.push(sybolOfCoin);
                break;
            }
        }
        console.log(arrCoinsSymbol);
        return;
    }
}

function limitOfSelectedCoin(e) {
    //Get the id of last coin
    let lastCoinId = e.target.parentElement.parentElement.parentElement.parentElement.id

    // Remove the last coin
    e.target.parentElement.parentElement.parentElement.parentElement.remove()



    document.querySelector(".popup").style = 'display:block';
    document.querySelector(".cover").style = 'display:block';

    let coinSelcted = document.querySelectorAll('.play');

    for (let i = 0; i < coinSelcted.length; i++) {
        coins = coinSelcted[i].parentElement.parentElement.parentElement.parentElement


        console.log(coins);
        coins.classList.add('col-md-12');
        let div_inside_form = document.createElement("div");

        document.querySelector(".popup").appendChild(div_inside_form);
        div_inside_form.appendChild(coins);


    }



    let btnSave = document.createElement("btn");
    let btnClose = document.createElement("btn");
    btnSave.classList.add("btn", 'btn-success', 'col-md-5', 'm-3');
    btnClose.classList.add("btn", 'btn-info', 'col-md-5', 'm-3');
    btnSave.textContent = "SAVE";
    btnClose.textContent = "ClOSE";
    document.querySelector(".popup").appendChild(btnSave);
    document.querySelector(".popup").appendChild(btnClose);

    btnClose.addEventListener("click", function () {
        document.querySelector(".popup").style = 'display:none';
        document.querySelector(".cover").style = 'display:none';
    })

}

// Remove id from array when switch button clicked
function removeCoinFromArr(e) {
    let idOfCoinThetClicked = e.target.parentElement.parentElement.parentElement.parentElement.id
    console.log(idOfCoinThetClicked);
    for (let i = 0; i < 5; i++) {
        if (arrCoinsClicked[i] === idOfCoinThetClicked) {
            arrCoinsClicked.splice(i, 1);
        }
    }
}

// Remove symbol from array when switch button clicked
function removeSymbolFromArr(e) {

    let symbolOfCoinThetClicked = e.target.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    console.log(symbolOfCoinThetClicked);
    for (let i = 0; i < 5; i++) {
        if (arrCoinsSymbol[i] === symbolOfCoinThetClicked) {
            arrCoinsSymbol.splice(i, 1);
        }
    }
}

const getDataOnCoin = (coin, event) => {


    document.getElementById(`${coin.id}btn`).classList.toggle('show');
    document.getElementById(`${coin.id}btn`).classList.toggle('active');



    if (localStorage.getItem(`${coin.id}`) === null) {
        console.log('call ajax');

        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${coin.id}`,
            type: "GET",
            success: function (res) {
                let coinData = res;
                infoCoin = {
                    id: coinData.id,
                    img: coinData.image.large,
                    priceUsd: coinData.market_data.current_price.usd,
                    priceEur: coinData.market_data.current_price.eur,
                    priceIls: coinData.market_data.current_price.ils
                }

                localStorageArr.push(infoCoin);

                if ($(document.getElementById(`${coin.id}btn`)).hasClass('show')) {

                    localStorage.setItem(`${infoCoin.id}`, JSON.stringify(infoCoin));
                }

                document.getElementById(`${coin.id}btn`).innerHTML =
                    `
                <br>
                <img src=${infoCoin.img} />
                <br>
                <br>1 coin =${infoCoin.priceUsd} $ <br>
                1 coin =${infoCoin.priceEur} € <br>
                1 coin =${infoCoin.priceIls} ₪ <i class="fas fa-shekel-sign"></i> <br>
                `

            },

            error: function (xhr) {
                console.log("Error:", xhr);
            }

        });  // End of ajax
        return;
    }// End if



    console.log('dont call ajax');
    // cheak if LS is not null
    if (localStorage.getItem(`${infoCoin.id}`) !== null) {
        setTimeout(() => {
            console.log("Ls Cleaned");

            localStorage.removeItem(`${coin.id}`);
            document.getElementById(`${coin.id}btn`).innerHTML = ''
        }, 1000 * 5); //End of setTimeout

    }//End if
}// End func

let arrNameOfCoinWithPrice = [];

const canvasjs = (data) => {
    setInterval(() => {
        console.log("interval");

        $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${arrCoinsSymbol.join()},ETH&tsyms=USD`,
            type: "GET",
            data: { apikey: "4f422e5c71db3277606233e9a02d6ce88550f7a69bb5a398ecb9b8f8d03d4f2c" },
            success: function (res) {
                let data = res;
                console.log(data);   


            },
            error: function (xhr) {
                console.log("Error:", xhr);
            }
        });

    }, 1000 * 5)


    arrCoinsSymbol.forEach((element) => {
        let priceOfCoin;
        if (data[element] !== undefined) {

            arrNameOfCoinWithPrice.push(element)
            priceOfCoin = data[element].USD;
            arrPriceOfCoin.push({ element: priceOfCoin })

        }
    });
    console.log(arrPriceOfCoin);
    console.log(arrCoinsSymbol);
    console.log(arrNameOfCoinWithPrice);


    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        title: {
            text: "Share Value of Two Companies"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            prefix: "$",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                xValueFormatString: "hh:mm:ss TT",
                showInLegend: true,
                name: "Coin 1",
                dataPoints: dataPoints1
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: true,
                name: "Coin 2",
                dataPoints: dataPoints2
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: true,
                name: "Coin 3",
                dataPoints: dataPoints3
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: true,
                name: "Coin 4",
                dataPoints: dataPoints4
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: true,
                name: "Coin 5",
                dataPoints: dataPoints5
            }
        ]
    });

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    var updateInterval = 2000;
    // initial value
    var yValue1 = 600;
    var yValue2 = 605;
    var yValue3 = 605;
    var yValue4 = 605;
    var yValue5 = 605;

    var time = new Date;
    // starting at 9.30 am
    time.setHours(9);
    time.setMinutes(30);
    time.setSeconds(00);
    time.setMilliseconds(00);

    function updateChart(count) {
        count = count || 1;
        var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            deltaY1 = .5 + Math.random() * (-.5 - .5);
            deltaY2 = .5 + Math.random() * (-.5 - .5);
            deltaY3 = .5 + Math.random() * (-.5 - .5);
            deltaY4 = .5 + Math.random() * (-.5 - .5);
            deltaY5 = .5 + Math.random() * (-.5 - .5);

            // adding random value and rounding it to two digits. 
            yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
            yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;
            yValue3 = Math.round((yValue3 + deltaY3) * 100) / 100;
            yValue4 = Math.round((yValue4 + deltaY4) * 100) / 100;
            yValue5 = Math.round((yValue5 + deltaY5) * 100) / 100;

            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
            dataPoints3.push({
                x: time.getTime(),
                y: yValue3
            });
            dataPoints4.push({
                x: time.getTime(),
                y: yValue4
            });
            dataPoints5.push({
                x: time.getTime(),
                y: yValue5
            });
        }

        // updating legend text with  updated with y Value 
        chart.options.data[0].legendText = `Coin 1  $ ` + yValue1;
        chart.options.data[1].legendText = " Coin 2  $" + yValue2;
        chart.options.data[2].legendText = " Coin 3  $" + yValue3;
        chart.options.data[3].legendText = " Coin 4  $" + yValue4;
        chart.options.data[4].legendText = " Coin 5  $" + yValue5;
        chart.render();
    }
    // generates first set of dataPoints 
    updateChart(100);
    setInterval(function () { updateChart() }, updateInterval);

} // End of function






