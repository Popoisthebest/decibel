document.addEventListener("DOMContentLoaded", function () {
    const dbValueElement = document.getElementById('dbValue');
    const warningElement = document.getElementById('warning');
    const timeElement = document.getElementById('time');
    
    const bars = document.querySelectorAll('.bar');

    function updateTime() {
        timeElement.innerText = moment().format('LTS');
    }

    setInterval(updateTime, 1000);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);

            setInterval(function () {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                const values = array.reduce((a, b) => a + b, 0);
                const average = values / array.length;
                const dbValue = Math.round(average);

                // 그대로 데시벨 값 출력 (padStart 제거)
                dbValueElement.innerText = dbValue;

                if (dbValue > 70) {
                    warningElement.style.display = 'block';
                } else {
                    warningElement.style.display = 'none';
                }

                // 이퀄라이저 바 업데이트
                const barHeight = Math.min(300, (dbValue / 120) * 300); // 120dB를 기준으로 300px까지 높이 조정

                bars.forEach((bar, index) => {
                    // 각 막대가 조금씩 다르게 움직이도록 미세한 랜덤성을 추가
                    bar.style.height = `${barHeight * (0.9 + Math.random() * 0.5)}px`;
                });

            }, 10); // 100ms 간격으로 업데이트
        })
        .catch(function (err) {
            console.error('마이크 접근 실패:', err);
        });
});
