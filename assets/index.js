

// Container onde os assentos serão renderizados
const container = document.getElementById("seatsContainer");

// Elementos do resumo
const selectedSeatsEl = document.getElementById("selectedSeats");
const quantityEl = document.getElementById("quantity");
const totalEl = document.getElementById("total");

// Preço por assento
const pricePerSeat = 20;

// Limite máximo de assentos
const maxSeats = 5;

// Fileiras
const rows = ["A", "B", "C", "D"];

// Assentos por lado
const seatsPerSide = 3;


// ===============================
// 🔔 NOTIFICATION (v1 simples)
// ===============================
function showNotification(message) {
    alert(message); // depois você troca por card bonito 😏
}


// ===============================
// 🧾 ATUALIZAR RESUMO
// ===============================
function updateSummary() {

    // Pega todos os selecionados
    const selectedSeats = document.querySelectorAll(".seat.selected");

    const seatNames = [];

    selectedSeats.forEach(seat => {
        const row = seat.parentElement.querySelector(".row-label").textContent;
        const number = seat.textContent;

        seatNames.push(row + number);
    });

    // Atualiza lista
    selectedSeatsEl.textContent = seatNames.length > 0 
        ? seatNames.join(", ") 
        : "None";

    // Atualiza quantidade
    quantityEl.textContent = seatNames.length;

    // Calcula total
    const total = seatNames.length * pricePerSeat;
    totalEl.textContent = total;
}


// ===============================
// 🎟️ GERAR ASSENTOS
// ===============================

rows.forEach(rowLetter => {

    // Criar fileira
    const row = document.createElement("div");
    row.classList.add("row");

    // Label da fileira (A, B, C...)
    const label = document.createElement("span");
    label.classList.add("row-label");
    label.textContent = rowLetter;
    row.appendChild(label);

    // =========================
    // 🪑 LADO ESQUERDO
    // =========================
    for (let i = 1; i <= seatsPerSide; i++) {

        const seat = document.createElement("div");
        seat.classList.add("seat", "available");
        seat.textContent = i;

        // Evento de clique
        seat.addEventListener("click", () => {

            // 🚫 Ocupado
            if (seat.classList.contains("occupied")) {
                showNotification("This seat is already occupied!");
                return;
            }

            const selectedSeats = document.querySelectorAll(".seat.selected");

            // 🚫 Limite atingido
            if (!seat.classList.contains("selected") && selectedSeats.length >= maxSeats) {
                showNotification(`You can select up to ${maxSeats} seats only.`);
                return;
            }

            // 🔁 Toggle
            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                seat.classList.add("available");
            } else {
                seat.classList.remove("available");
                seat.classList.add("selected");
            }

            // Atualiza resumo
            updateSummary();
        });

        row.appendChild(seat);
    }

    // =========================
    // 🚶 CORREDOR
    // =========================
    const aisle = document.createElement("div");
    aisle.classList.add("aisle");
    row.appendChild(aisle);


    // =========================
    // 🪑 LADO DIREITO
    // =========================
    for (let i = seatsPerSide + 1; i <= seatsPerSide * 2; i++) {

        const seat = document.createElement("div");
        seat.classList.add("seat", "available");
        seat.textContent = i;

        // Evento de clique
        seat.addEventListener("click", () => {

            if (seat.classList.contains("occupied")) {
                showNotification("This seat is already occupied!");
                return;
            }

            const selectedSeats = document.querySelectorAll(".seat.selected");

            if (!seat.classList.contains("selected") && selectedSeats.length >= maxSeats) {
                showNotification(`You can select up to ${maxSeats} seats only.`);
                return;
            }

            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                seat.classList.add("available");
            } else {
                seat.classList.remove("available");
                seat.classList.add("selected");
            }

            updateSummary();
        });

        row.appendChild(seat);
    }

    // Adiciona fileira no container
    container.appendChild(row);
});


// ===============================
// 🚀 INICIALIZAÇÃO
// ===============================
updateSummary();
