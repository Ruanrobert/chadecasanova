
const giftList = ['Panela de pressão antiaderente', 'Jarra de suco de vidro', 'Jarra com tampa', 'Kit de vasos plásticos', 'Chaleira', 'Farinheira', 'Kit de copos', 'Conjunto de xicaras', 'conjunto de pratos', 'tapete de cozinha', 'conjunto de banheiro', 'lençol de elástico casal box', 'lençol de casal box', 'cobertor de casal', 'batedeira (preta)', 'forma de bolo', 'jogo de toalha', 'Forma de pizza', 'Faqueiro', 'Travessa com tampa', 'Jogo de panela antiaderente', 'Taça de sobremesa', 'Tapete de sala', 'Kit de banheiro (porta sabonete, porta escova) de vidro', 'Garrafa de agua', 'Concha', 'Peneira', 'Triturador', 'Cesto de roupa', 'Lixeira de pia', 'Lixeira de banheiro (inox)', 'pano de prato', 'Toalha de rosto', 'Conjunto de taça', 'Capa de almofada', 'Jogo americano', 'Manta de sofa', 'Fruteira', 'Ferro de passar', 'Frigideira grande', 'Descanso de panela'];
let reservations = JSON.parse(localStorage.getItem("reservations") || '{}');
let selectedItem = null;

function updateList() {
  const container = document.getElementById("gift-list");
  container.innerHTML = "";
  giftList.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    const label = document.createElement("span");
    label.textContent = item;
    card.appendChild(label);

    if (reservations[item]) {
      card.classList.add("reserved");
      const reservedBy = document.createElement("small");
      reservedBy.textContent = `Reservado por {reservations[item]}`;
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancelar";
      cancelBtn.className = "cancel";
      cancelBtn.onclick = () => releaseItem(item);
      card.appendChild(reservedBy);
      card.appendChild(cancelBtn);
    } else {
      const btn = document.createElement("button");
      btn.textContent = "Reservar";
      btn.onclick = () => openForm(item);
      card.appendChild(btn);
    }
    container.appendChild(card);
  });
}

function openForm(item) {
  selectedItem = item;
  document.getElementById("form-container").classList.remove("hidden");
}

function confirmReservation() {
  const name = document.getElementById("name").value;
  if (name && selectedItem) {
    reservations[selectedItem] = name;
    localStorage.setItem("reservations", JSON.stringify(reservations));
    selectedItem = null;
    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("name").value = "";
    updateList();
  }
}

function cancel() {
  selectedItem = null;
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("name").value = "";
}

function releaseItem(item) {
  delete reservations[item];
  localStorage.setItem("reservations", JSON.stringify(reservations));
  updateList();
}

updateList();
