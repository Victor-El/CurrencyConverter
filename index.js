window.onload = function () {
    //console.log("User");
    const apiUrl = "http://data.fixer.io/api/latest?access_key=ea5f93789a09fd9b09c6995cd15d7fd6";
    const to_amount_field = document.getElementById('to-amount');
    const from_amount_field = document.getElementById('from-amount');
    const to_field = document.getElementById('to-currency');
    const from_field = document.getElementById('from-currency');
    let from = document.getElementById('from-currency').value;
    let to = document.getElementById('to-currency').value;
    let requestAPI = apiUrl + "&symbols=" + from + "," + to;
    console.log(requestAPI);
    let http = new XMLHttpRequest();
    http.open('GET', requestAPI, true);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            getData();
        }
    };

    from_amount_field.addEventListener('keyup', getData);
    from_field.addEventListener('change', function () {
        http = new XMLHttpRequest();
        requestAPI = apiUrl + "&symbols=" + from_field.value + "," + to_field.value;
        http.open('GET', requestAPI, true);
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                getData();
            }
        };
    });
    to_field.addEventListener('change', function () {
        http = new XMLHttpRequest();
        requestAPI = apiUrl + "&symbols=" + from_field.value + "," + to_field.value;
        http.open('GET', requestAPI, true);
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                getData();
            }
        };
    });

    function getData() {
        console.log(http.responseText);
        let res = JSON.parse(http.response);
        let val = res['rates'][to_field.value]/res['rates'][from_field.value] * from_amount_field.value;
        to_amount_field.value = Math.round(parseFloat(val) * 100) / 100;
        console.log(val);
    }

};