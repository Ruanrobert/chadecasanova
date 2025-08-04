
const giftList = ['Panela de pressão antiaderente', 'Jarra de suco de vidro', 'Jarra com tampa', 'Kit de vasos plásticos', 'Chaleira', 'Farinheira', 'Kit de copos', 'Conjunto de xicaras', 'conjunto de pratos', 'tapete de cozinha', 'conjunto de banheiro', 'lençol de elástico casal box', 'lençol de casal box', 'cobertor de casal', 'batedeira (preta)', 'forma de bolo', 'jogo de toalha', 'Forma de pizza', 'Faqueiro', 'Travessa com tampa', 'Jogo de panela antiaderente', 'Taça de sobremesa', 'Tapete de sala', 'Kit de banheiro (porta sabonete, porta escova) de vidro', 'Garrafa de agua', 'Concha', 'Peneira', 'Triturador', 'Cesto de roupa', 'Lixeira de pia', 'Lixeira de banheiro (inox)', 'pano de prato', 'Toalha de rosto', 'Conjunto de taça', 'Capa de almofada', 'Jogo americano', 'Manta de sofa', 'Fruteira', 'Ferro de passar', 'Frigideira grande', 'Descanso de panela'];
let reservations = JSON.parse(localStorage.getItem("reservations") || '{}');
let selectedItem = null;

function updateList() {
  const ul = document.getElementById("gift-list");
  ul.innerHTML = "";
  giftList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    if (reservations[item]) {
      li.classList.add("reserved");
      li.innerHTML += ` - Reservado por {reservations[item]} <button onclick="releaseItem('{item}')">Cancelar</button>`;
    } else {
      li.addEventListener("click", () => openForm(item));
    }
    ul.appendChild(li);
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
    updateList();
  }
}

function cancel() {
  selectedItem = null;
  document.getElementById("form-container").classList.add("hidden");
}

function releaseItem(item) {
  delete reservations[item];
  localStorage.setItem("reservations", JSON.stringify(reservations));
  updateList();
}

updateList();
