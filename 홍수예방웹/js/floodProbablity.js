async function showFloodProbability() {
  const { precipitationProbability } = await fetchWeatherData(55, 127);
  const probability = calculateFloodProbability(precipitationProbability);

  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <h2>홍수 확률</h2>
    <p>현재 강수 확률: ${precipitationProbability}%</p>
    <p>현재 홍수 확률: ${probability}%</p>
  `;
}

function calculateFloodProbability(avgPop) {
  if (avgPop > 80) return 90;
  if (avgPop > 60) return 70;
  if (avgPop > 40) return 50;
  if (avgPop > 20) return 30;
  return 10;
}
