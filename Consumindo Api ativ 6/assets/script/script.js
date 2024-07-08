// prevenir que o formulário seja enviado
document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
   
    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');

        // consumindo API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5d35be4587ec4b2078b25a41699b10c7&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não foi encontrado a Cidade/País');
        }
    } else {
        clearInfo();
    }

});

// mostrar as especificações
function showInfo(json) {
    showWarning('');

    // preenchendo o display
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    // img do display
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    // vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    // mostrar display
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};

