// 1. Fungsi Buka Undangan & Play Music
const music = document.getElementById("bg-music");

function openWedding() {
  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("hero").style.display = "none";

  // Play Music otomatis saat tombol diklik
  music.play();
}

function toggleMusic() {
  const icon = document.getElementById("music-icon");
  if (music.paused) {
    music.play();
    icon.classList.add("fa-spin");
  } else {
    music.pause();
    icon.classList.remove("fa-spin");
  }
}

// 2. Countdown Timer
const weddingDate = new Date("December 01, 2026 08:00:00").getTime();

const timerInterval = setInterval(function () {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText =
    seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML =
      "<h3>Acara Telah Berlangsung</h3>";
  }
}, 1000);

// 3. Salin Nomor Rekening
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  });
}

// 4. RSVP Form ke WhatsApp
function sendToWhatsapp(e) {
  e.preventDefault();

  // GANTI nomor ini dengan nomor WhatsApp penerima (gunakan format 628xxx)
  const phone = "6288225910725";

  const nama = document.getElementById("nama").value;
  const kehadiran = document.getElementById("kehadiran").value;
  const pesan = document.getElementById("pesan").value;

  const message =
    `Halo, saya *${nama}*%0A` +
    `Konfirmasi Kehadiran: *${kehadiran}*%0A` +
    `Pesan/Ucapan: ${pesan}`;

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappUrl, "_blank");
}
