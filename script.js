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

// GANTI URL DI BAWAH INI DENGAN LINK WEB APP DARI GOOGLE APPS SCRIPT
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzU7v1t4QuqI-fFtvzjH115gY9vSKpHUwmFPwgOLrWVqjUTp2yNDDJ0ZNU4ALObqh-1/exec";

// Fungsi untuk Mengambil & Menampilkan Daftar Ucapan
function loadComments() {
  fetch(scriptURL)
    .then((response) => response.json())
    .then((data) => {
      const listContainer = document.getElementById("comments-list");
      listContainer.innerHTML = ""; // Bersihkan loading

      if (data.length === 0) {
        listContainer.innerHTML =
          '<p style="text-align:center; color:#888;">Belum ada ucapan. Jadi yang pertama mengirim ucapan!</p>';
        return;
      }

      // Tampilkan ucapan terbaru di paling atas
      data.reverse().forEach((item) => {
        const badgeClass =
          item.kehadiran === "Hadir" ? "badge-hadir" : "badge-absent";

        const card = `
          <div class="comment-card">
            <div class="comment-header">
              <strong>${item.nama}</strong>
              <span class="${badgeClass}">${item.kehadiran}</span>
            </div>
            <p>${item.pesan}</p>
          </div>
        `;
        listContainer.innerHTML += card;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("comments-list").innerHTML =
        '<p style="text-align:center; color:red;">Gagal memuat ucapan.</p>';
    });
}

// Fungsi Kirim Ucapan ke Google Sheets
function submitMessage(e) {
  e.preventDefault();

  const btn = document.getElementById("btn-submit");
  btn.disabled = true;
  btn.innerText = "Mengirim...";

  const payload = {
    nama: document.getElementById("nama").value,
    kehadiran: document.getElementById("kehadiran").value,
    pesan: document.getElementById("pesan").value,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((response) => {
      alert("Terima kasih! Ucapan Anda berhasil terkirim.");
      document.getElementById("rsvp-form").reset();
      btn.disabled = false;
      btn.innerText = "Kirim Ucapan";
      loadComments(); // Refresh daftar ucapan
    })
    .catch((error) => {
      console.error("Error!", error.message);
      alert("Gagal mengirim ucapan. Coba lagi.");
      btn.disabled = false;
      btn.innerText = "Kirim Ucapan";
    });
}

// Panggil ucapan saat pertama kali halaman dimuat
document.addEventListener("DOMContentLoaded", loadComments);
