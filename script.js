// Variáveis e Seletores do DOM
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-button');

let totalSeconds = 1500; // 25 minutos * 60 segundos
let interval;
let isPaused = true;

// 1. Função para Formatar o Tempo (Ex: 05:00, 25:00)
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// 2. Função Principal do Cronômetro
function startTimer() {
    if (!isPaused) return; // Não inicia se já estiver rodando
    isPaused = false;
    
    // Esconde 'Iniciar', mostra 'Pausar' e 'Resetar'
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');

    interval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            isPaused = true;
            
            // Lógica de alarme (você pode adicionar um som aqui)
            alert('Tempo Esgotado! Hora da Pausa/Foco!'); 
            
            // Reseta para o próximo modo ou modo inicial
            resetTimer(); 
            return;
        }

        totalSeconds--;
        updateDisplay();
    }, 1000); // Roda a cada 1 segundo (1000ms)
}

// 3. Função Pausar
function pauseTimer() {
    clearInterval(interval);
    isPaused = true;
    
    // Mostra 'Iniciar', esconde 'Pausar'
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
}

// 4. Função Resetar
function resetTimer() {
    pauseTimer();
    
    // Pega o tempo do botão que está ativo (para resetar ao modo atual)
    const activeTime = document.querySelector('.mode-button.active').dataset.time;
    totalSeconds = parseInt(activeTime) * 60;
    
    // Garante que o display inicial seja 25:00 (ou o tempo do modo)
    updateDisplay(); 
    
    // Mostra 'Iniciar' (se o usuário não pausou e o tempo acabou)
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
}


// 5. Função de Troca de Modos
function switchMode(newTime) {
    // 1. Limpa o intervalo anterior (se estiver rodando)
    pauseTimer();

    // 2. Atualiza o tempo e o display
    totalSeconds = parseInt(newTime) * 60;
    updateDisplay();

    // 3. Reseta a exibição dos botões
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
}

// 6. Adiciona Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);


// Configuração dos botões de Modo
modeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove a classe 'active' de todos os botões
        modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe 'active' ao botão clicado
        e.target.classList.add('active');

        // Pega o tempo do atributo 'data-time' e troca o modo
        const newTime = e.target.dataset.time;
        switchMode(newTime);
    });
});

// Inicializa o display ao carregar a página
updateDisplay();