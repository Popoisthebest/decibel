async function fetchWeatherData(nx, ny) {
    const API_KEY = 'your-api-key-here'; // Replace with actual API key
    const BASE_URL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
  
    const response = await fetch(`${BASE_URL}?serviceKey=${API_KEY}&nx=${nx}&ny=${ny}`);
    const data = await response.json();
  
    const items = data.response.body.items.item;
    const popValues = items.filter(item => item.category === 'POP').map(item => parseFloat(item.fcstValue));
  
    const avgPop = popValues.length > 0 ? popValues.reduce((a, b) => a + b, 0) / popValues.length : 0;
  
    return {
      precipitationProbability: avgPop
    };
  }
  