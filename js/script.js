/* =========================================================
   ALJABAR MENYENANGKAN – Skrip utama (dipakai semua halaman)
   ========================================================= */

/* ---------- 1. Menu: tombol garis tiga (HP) & penanda halaman aktif ---------- */
const tombolMenu = document.querySelector(".tombol-menu");
const menu = document.querySelector(".menu");

if (tombolMenu && menu) {
  tombolMenu.addEventListener("click", () => menu.classList.toggle("buka"));
}

const halamanIni = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".menu a").forEach((link) => {
  if (link.getAttribute("href") === halamanIni) link.classList.add("aktif");
});

/* ---------- 2. Elemen muncul pelan saat digulir ---------- */
const elemenGulir = document.querySelectorAll(".muncul-saat-gulir");
if ("IntersectionObserver" in window) {
  const pengamat = new IntersectionObserver((daftar) => {
    daftar.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("terlihat");
        pengamat.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });
  elemenGulir.forEach((el) => pengamat.observe(el));
} else {
  elemenGulir.forEach((el) => el.classList.add("terlihat"));
}

/* ---------- 3. Gelembung sapaan Kak Jihan (efek mengetik) ---------- */
const gelembung = document.getElementById("gelembung");
if (gelembung) {
  const sapaan = [
    "Halo! Aku Kak Jihan.",
    "Yuk belajar menyederhanakan bentuk aljabar!",
    "Ingat: gabungkan suku yang warnanya sama ya!"
  ];
  let urutan = 0;

  function ketik(teks, i = 0) {
    gelembung.textContent = teks.slice(0, i);
    if (i < teks.length) {
      setTimeout(() => ketik(teks, i + 1), 40);
    } else {
      setTimeout(() => {
        urutan = (urutan + 1) % sapaan.length;
        ketik(sapaan[urutan]);
      }, 2600);
    }
  }
  ketik(sapaan[0]);
}

/* ---------- 4. Demo "Rahasia Menyederhanakan Aljabar" (beranda) ---------- */
const demoEkspresi = document.getElementById("demo-ekspresi");

if (demoEkspresi) {
  const demoLabel = document.getElementById("demo-label");
  const demoTitik = document.getElementById("demo-titik");
  const tombolLanjut = document.getElementById("demo-lanjut");
  const tombolUlang = document.getElementById("demo-ulang");

  // s(teks, jenis) = suku berwarna;  o(teks) = tanda operasi / kurung
  const s = (teks, jenis) => ({ teks, jenis });
  const o = (teks) => ({ teks, op: true });

  const langkah = [
    {
      label: "Ini bentuk aljabar awalnya. Suku-sukunya masih tercampur.",
      isi: [s("6x"), o("+"), s("4y"), o("−"), s("x"), o("+"), s("y"), o("+"), s("3"), o("−"), s("1")]
    },
    {
      label: "Langkah 1: Beri warna yang sama untuk suku-suku yang sejenis.",
      isi: [s("6x","x"), o("+"), s("4y","y"), o("−"), s("x","x"), o("+"), s("y","y"), o("+"), s("3","k"), o("−"), s("1","k")]
    },
    {
      label: "Langkah 2: Kumpulkan suku yang warnanya sama.",
      isi: [o("("), s("6x","x"), o("−"), s("x","x"), o(")"), o("+"),
            o("("), s("4y","y"), o("+"), s("y","y"), o(")"), o("+"),
            o("("), s("3","k"), o("−"), s("1","k"), o(")")]
    },
    {
      label: "Langkah 3: Hitung koefisiennya. Selesai! 🎉",
      isi: [s("5x","x"), o("+"), s("5y","y"), o("+"), s("2","k")]
    }
  ];

  let posisi = 0;

  // titik penanda langkah
  demoTitik.innerHTML = langkah.map(() => "<span></span>").join("");

  function tampilkan() {
    const data = langkah[posisi];
    demoLabel.textContent = data.label;
    demoEkspresi.innerHTML = data.isi.map((item, i) => {
      const jeda = `style="animation-delay:${i * 0.05}s"`;
      if (item.op) {
        const kelas = item.teks === "(" || item.teks === ")" ? "op kurung" : "op";
        return `<span class="${kelas}">${item.teks}</span>`;
      }
      return `<span class="suku ${item.jenis || ""}" ${jeda}>${item.teks}</span>`;
    }).join("");

    demoTitik.querySelectorAll("span").forEach((t, i) => t.classList.toggle("aktif", i === posisi));
    tombolLanjut.style.display = posisi === langkah.length - 1 ? "none" : "";
  }

  tombolLanjut.addEventListener("click", () => {
    if (posisi < langkah.length - 1) { posisi++; tampilkan(); }
  });
  tombolUlang.addEventListener("click", () => { posisi = 0; tampilkan(); });

  tampilkan();
}

/* =========================================================
   5. HALAMAN KENALAN: bagian-bagian bentuk aljabar
   ========================================================= */
const ekspresiKenalan = document.getElementById("ekspresi-kenalan");

if (ekspresiKenalan) {
  const infoIstilah = document.getElementById("info-istilah");
  const tombolIstilah = document.querySelectorAll(".istilah");

  const penjelasan = {
    variabel: {
      judul: "Variabel",
      isi: "Huruf yang mewakili bilangan yang belum diketahui nilainya. Di contoh ini variabelnya adalah <b>x</b> dan <b>y</b>."
    },
    koefisien: {
      judul: "Koefisien",
      isi: "Angka yang ditulis di depan variabel. Koefisien x adalah <b>3</b>, dan koefisien y adalah <b>2</b>. Kalau tidak ada angkanya, misalnya <b>x</b>, berarti koefisiennya 1."
    },
    konstanta: {
      judul: "Konstanta",
      isi: "Suku yang hanya berupa angka, tanpa variabel. Di contoh ini konstantanya <b>−5</b>. Tanda minus di depannya ikut menjadi bagian dari konstanta."
    },
    suku: {
      judul: "Suku",
      isi: "Bagian-bagian bentuk aljabar yang dipisahkan oleh tanda + atau −. Contoh ini punya <b>3 suku</b>: <b>3x</b>, <b>2y</b>, dan <b>−5</b>."
    }
  };

  function pilihIstilah(nama) {
    // hapus sorotan lama
    ekspresiKenalan.querySelectorAll(".sorot").forEach((el) => el.classList.remove("sorot"));
    ekspresiKenalan.querySelectorAll(".sorot-suku").forEach((el) => el.classList.remove("sorot-suku"));

    // sorot bagian yang sesuai
    if (nama === "suku") {
      ekspresiKenalan.querySelectorAll(".suku-ek").forEach((el) => el.classList.add("sorot-suku"));
    } else {
      ekspresiKenalan.querySelectorAll(`[data-istilah="${nama}"]`).forEach((el) => el.classList.add("sorot"));
    }

    tombolIstilah.forEach((t) => t.classList.toggle("aktif", t.dataset.istilah === nama));

    infoIstilah.innerHTML = `<h3>${penjelasan[nama].judul}</h3><p>${penjelasan[nama].isi}</p>`;
    infoIstilah.classList.remove("baru");
    void infoIstilah.offsetWidth; // ulang animasi
    infoIstilah.classList.add("baru");
  }

  tombolIstilah.forEach((t) => t.addEventListener("click", () => pilihIstilah(t.dataset.istilah)));
  ekspresiKenalan.querySelectorAll("[data-istilah]").forEach((el) => {
    el.addEventListener("click", () => pilihIstilah(el.dataset.istilah));
  });
}

/* =========================================================
   6. HALAMAN KENALAN: mini-game "Tangkap Suku Sejenis"
   ========================================================= */
const game = document.getElementById("game");

if (game) {
  // benar: true = sejenis dengan target
  const ronde = [
    {
      target: "4x",
      pilihan: [["7x", true], ["4y", false], ["−x", true], ["4", false], ["x<sup>2</sup>", false], ["10x", true]],
      alasan: "7x, −x, dan 10x sama-sama memiliki variabel x berpangkat 1. Ingat, 4y beda variabel dan x² beda pangkat."
    },
    {
      target: "3y",
      pilihan: [["5y", true], ["3x", false], ["−2y", true], ["y", true], ["3", false], ["y<sup>2</sup>", false]],
      alasan: "5y, −2y, dan y sejenis dengan 3y. Suku y artinya 1y, jadi tetap sejenis!"
    },
    {
      target: "6",
      pilihan: [["6x", false], ["−2", true], ["10", true], ["y", false], ["7", true], ["6ab", false]],
      alasan: "Konstanta sejenis dengan konstanta lain: −2, 10, dan 7. Suku 6x dan 6ab punya variabel, jadi tidak sejenis."
    },
    {
      target: "2ab",
      pilihan: [["5ab", true], ["2a", false], ["−ab", true], ["2b", false], ["ba", true], ["a<sup>2</sup>b", false]],
      alasan: "5ab, −ab, dan ba sejenis dengan 2ab. Perhatikan: ba sama dengan ab karena urutan perkalian boleh ditukar!"
    },
    {
      target: "x<sup>2</sup>",
      pilihan: [["3x<sup>2</sup>", true], ["2x", false], ["−x<sup>2</sup>", true], ["x<sup>2</sup>y", false], ["5x<sup>2</sup>", true], ["x", false]],
      alasan: "3x², −x², dan 5x² sejenis karena variabel dan pangkatnya sama. x²y punya tambahan variabel y."
    }
  ];

  const elRonde = document.getElementById("game-ronde");
  const elSkor = document.getElementById("game-skor");
  const elIsi = document.getElementById("game-isi");
  const isiAwal = elIsi.innerHTML;
  let elTarget, elPilihan, elUmpan, btnPeriksa, btnLanjut;

  // ambil elemen permainan & pasang tombolnya
  function siapkan() {
    elTarget = document.getElementById("game-target");
    elPilihan = document.getElementById("game-pilihan");
    elUmpan = document.getElementById("game-umpan");
    btnPeriksa = document.getElementById("game-periksa");
    btnLanjut = document.getElementById("game-lanjut");
    btnPeriksa.addEventListener("click", periksa);
    btnLanjut.addEventListener("click", () => {
      if (nomor < ronde.length - 1) { nomor++; tampilRonde(); }
      else layarAkhir();
    });
  }

  let nomor = 0;
  let skor = 0;

  function acak(daftar) {
    return daftar.map((a) => [Math.random(), a]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  }

  function tampilRonde() {
    const r = ronde[nomor];
    elRonde.textContent = `Ronde ${nomor + 1} dari ${ronde.length}`;
    elSkor.textContent = `Skor: ${skor}`;
    elTarget.innerHTML = `<span class="suku netral">${r.target}</span>`;
    elUmpan.textContent = "";
    elUmpan.className = "umpan-balik";
    btnPeriksa.style.display = "";
    btnLanjut.style.display = "none";

    elPilihan.innerHTML = "";
    acak(r.pilihan).forEach(([teks, benar]) => {
      const b = document.createElement("button");
      b.className = "pilihan";
      b.innerHTML = teks;
      b.dataset.benar = benar;
      b.addEventListener("click", () => b.classList.toggle("dipilih"));
      elPilihan.appendChild(b);
    });
  }

  function periksa() {
    const tombol = [...elPilihan.querySelectorAll(".pilihan")];
    if (!tombol.some((b) => b.classList.contains("dipilih"))) {
      elUmpan.textContent = "Pilih dulu minimal satu suku, ya!";
      elUmpan.className = "umpan-balik kurang";
      return;
    }

    let semuaTepat = true;
    tombol.forEach((b) => {
      const benar = b.dataset.benar === "true";
      const dipilih = b.classList.contains("dipilih");
      b.disabled = true;
      b.classList.remove("dipilih");
      if (benar && dipilih) b.classList.add("benar");
      else if (!benar && dipilih) { b.classList.add("salah"); semuaTepat = false; }
      else if (benar && !dipilih) { b.classList.add("terlewat"); semuaTepat = false; }
    });

    if (semuaTepat) {
      skor++;
      elUmpan.innerHTML = "Hebat, semuanya tepat! 🎉 " + ronde[nomor].alasan;
      elUmpan.className = "umpan-balik ok";
    } else {
      elUmpan.innerHTML = "Belum tepat. Kotak bergaris putus-putus hijau adalah jawaban yang terlewat. " + ronde[nomor].alasan;
      elUmpan.className = "umpan-balik kurang";
    }
    elSkor.textContent = `Skor: ${skor}`;
    btnPeriksa.style.display = "none";
    btnLanjut.style.display = "";
    btnLanjut.textContent = nomor === ronde.length - 1 ? "Lihat Hasil →" : "Ronde Berikutnya →";
  }

  function layarAkhir() {
    const pesan = skor === ronde.length ? "Sempurna! Kamu sudah paham suku sejenis."
      : skor >= 3 ? "Bagus! Sedikit lagi jadi sempurna."
      : "Tidak apa-apa, baca lagi Bagian 3 lalu coba sekali lagi, ya!";
    elRonde.textContent = "Selesai!";
    elIsi.innerHTML = `
      <div class="layar-akhir">
        <p class="besar">${skor} / ${ronde.length}</p>
        <p>${pesan}</p>
        <div class="game-tombol">
          <button class="tombol tombol-terang" id="game-ulang">Main Lagi</button>
          <a href="metode.html" class="tombol tombol-utama">Lanjut ke Metode →</a>
        </div>
      </div>`;
    document.getElementById("game-ulang").addEventListener("click", mulai);
  }

  function mulai() {
    elIsi.innerHTML = isiAwal; // kembalikan tampilan permainan seperti semula
    siapkan();
    nomor = 0; skor = 0;
    tampilRonde();
  }

  mulai();
}

/* =========================================================
   7. ALAT BANTU: memberi warna otomatis pada suku sejenis
   Contoh: warnai("6x + 4y − x") → chip biru, oranye, biru
   ========================================================= */
function warnai(teks) {
  const potongan = teks.match(/\d*(?:[a-z](?:\^\d)?)+|\d+|\s+|./g) || [];
  return potongan.map((p, i) => {
    if (/^\s+$/.test(p)) return " ";
    if (p === "(" || p === ")") return `<span class="op kurung">${p}</span>`;
    if (/^[+−=×:]$/.test(p)) return `<span class="op">${p}</span>`;

    const tampil = p.replace(/\^(\d)/g, "<sup>$1</sup>");
    // angka tepat sebelum "(" adalah pengali, bukan suku
    if (/^\d+$/.test(p) && potongan[i + 1] === "(") return `<span class="pengali">${tampil}</span>`;

    const huruf = p.replace(/[\d^]/g, "");
    const berpangkat = p.includes("^");
    let jenis = "v";
    if (huruf === "") jenis = "k";
    else if (huruf === "x" && !berpangkat) jenis = "x";
    else if (huruf === "y" && !berpangkat) jenis = "y";
    return `<span class="suku ${jenis}">${tampil}</span>`;
  }).join("");
}

/* =========================================================
   8. KOMPONEN "LANGKAH DEMI LANGKAH"
   <div class="langkah-kotak" data-langkah="nama"></div>
   Isi langkah diambil dari objek DATA_LANGKAH di bawah.
   Setiap langkah: { label, eks } atau { label, html }
   ========================================================= */
const DATA_LANGKAH = {};

function pasangLangkah(kotak) {
  const daftar = DATA_LANGKAH[kotak.dataset.langkah];
  if (!daftar) return;

  kotak.innerHTML = `
    <p class="langkah-label"></p>
    <div class="langkah-tampil"></div>
    <div class="titik-langkah">${daftar.map(() => "<span></span>").join("")}</div>
    <div class="langkah-navigasi">
      <button class="tombol tombol-terang" data-aksi="mundur">← Sebelumnya</button>
      <button class="tombol tombol-utama" data-aksi="maju">Langkah Berikutnya →</button>
      <button class="tombol tombol-terang" data-aksi="ulang" style="display:none">Ulangi</button>
    </div>`;

  const label = kotak.querySelector(".langkah-label");
  const tampil = kotak.querySelector(".langkah-tampil");
  const titik = kotak.querySelectorAll(".titik-langkah span");
  const tMundur = kotak.querySelector('[data-aksi="mundur"]');
  const tMaju = kotak.querySelector('[data-aksi="maju"]');
  const tUlang = kotak.querySelector('[data-aksi="ulang"]');
  let posisi = 0;

  function gambar() {
    const l = daftar[posisi];
    label.innerHTML = l.label;
    let isi = "";
    // tampilkan baris sebelumnya (pudar) supaya alurnya terlihat
    if (l.eks && posisi > 0 && daftar[posisi - 1].eks && !l.tunggal) {
      isi += `<div class="ekspresi lama">${warnai(daftar[posisi - 1].eks)}</div>`;
    }
    isi += l.html ? l.html : `<div class="ekspresi">${(posisi > 0 && l.eks && !l.tunggal ? '<span class="op">=</span> ' : "") + warnai(l.eks)}</div>`;
    tampil.innerHTML = isi;
    titik.forEach((t, i) => t.classList.toggle("aktif", i === posisi));
    tMundur.style.display = posisi === 0 ? "none" : "";
    tMaju.style.display = posisi === daftar.length - 1 ? "none" : "";
    tUlang.style.display = posisi === daftar.length - 1 ? "" : "none";
  }

  tMaju.addEventListener("click", () => { if (posisi < daftar.length - 1) { posisi++; gambar(); } });
  tMundur.addEventListener("click", () => { if (posisi > 0) { posisi--; gambar(); } });
  tUlang.addEventListener("click", () => { posisi = 0; gambar(); });
  gambar();
}

/* =========================================================
   9. HALAMAN METODE: isi langkah tiap metode
   ========================================================= */

// Ubin aljabar: "x" = ubin x, "1" = ubin satuan, awalan "-" = negatif
function ubin(daftar, tanda = {}) {
  const isi = daftar.map((u, i) => {
    const neg = u.startsWith("-");
    const jenis = u.replace("-", "") === "x" ? "ux" : "u1";
    const kelas = ["ubin", jenis, neg ? "neg" : "", tanda[i] || ""].join(" ");
    return `<span class="${kelas}">${neg ? "−" : ""}${u.replace("-", "")}</span>`;
  }).join("");
  return `<div class="ubin-area">${isi}</div>`;
}

// Cara bersusun: setiap baris = [tanda, kolom x, kolom y, kolom konstanta]
function susun(baris, adaHasil) {
  let isi = "";
  baris.forEach((b, i) => {
    if (adaHasil && i === baris.length - 1) isi += `<span class="garis"></span>`;
    isi += `<span class="op">${b[0]}</span>` + b.slice(1).map((t) => `<span>${t ? warnai(t) : ""}</span>`).join("");
  });
  return `<div class="susun">${isi}</div>`;
}

const UBIN_AWAL = ["x", "x", "x", "1", "1", "-x", "-1", "-1", "-1"];

Object.assign(DATA_LANGKAH, {
  kelompok: [
    { label: "Ini bentuk aljabar yang akan disederhanakan.", eks: "7x + 2 − 3x + 5", tunggal: true },
    { label: "<b>Langkah 1:</b> Kumpulkan suku yang warnanya sama. Tanda di depan suku ikut pindah!", eks: "(7x − 3x) + (2 + 5)" },
    { label: "<b>Langkah 2:</b> Hitung koefisien tiap kelompok: 7 − 3 = 4 dan 2 + 5 = 7. Selesai!", eks: "4x + 7" }
  ],
  distributif: [
    { label: "Angka di depan kurung harus dikalikan ke <b>setiap</b> suku di dalam kurung.", eks: "2(3x + 4) + 5x", tunggal: true },
    { label: "<b>Langkah 1:</b> Kalikan: 2 × 3x = 6x dan 2 × 4 = 8.", eks: "6x + 8 + 5x" },
    { label: "<b>Langkah 2:</b> Kumpulkan suku sejenis.", eks: "(6x + 5x) + 8" },
    { label: "<b>Langkah 3:</b> Hitung koefisiennya: 6 + 5 = 11. Selesai!", eks: "11x + 8" }
  ],
  negatif: [
    { label: "Perhatikan tanda minus di depan angka 2. Tanda itu ikut dikalikan!", eks: "8x − 2(3x − 5)", tunggal: true },
    { label: "<b>Langkah 1:</b> −2 × 3x = −6x, dan −2 × (−5) = <b>+10</b> (negatif × negatif = positif).", eks: "8x − 6x + 10" },
    { label: "<b>Langkah 2:</b> Kumpulkan suku sejenis.", eks: "(8x − 6x) + 10" },
    { label: "<b>Langkah 3:</b> 8 − 6 = 2. Selesai!", eks: "2x + 10" }
  ],
  ubin: [
    { label: "Bentuk <b>3x + 2 − x − 3</b> digambar dengan ubin: 3 ubin x, 2 ubin satuan, 1 ubin −x, dan 3 ubin −1.", html: ubin(UBIN_AWAL) },
    { label: "<b>Langkah 1:</b> Pasangkan ubin positif dan negatif yang sejenis. Setiap pasangan nilainya <b>nol</b>.",
      html: ubin(UBIN_AWAL, { 2: "pasang", 5: "pasang", 3: "pasang", 4: "pasang", 6: "pasang", 7: "pasang" }) },
    { label: "<b>Langkah 2:</b> Buang semua pasangan nol.",
      html: ubin(UBIN_AWAL, { 2: "hilang", 5: "hilang", 3: "hilang", 4: "hilang", 6: "hilang", 7: "hilang" }) },
    { label: "<b>Langkah 3:</b> Tersisa 2 ubin x dan 1 ubin −1. Selesai!",
      html: ubin(["x", "x", "-1"]) + `<div class="ekspresi">${warnai("3x + 2 − x − 3")} <span class="op">=</span> ${warnai("2x − 1")}</div>` }
  ],
  susun: [
    { label: "Kita akan menjumlahkan <b>(4x + 3y − 2) + (x − 5y + 6)</b>. Tulis bentuk pertama dulu.",
      html: susun([["", "4x", "+3y", "−2"]], false) },
    { label: "<b>Langkah 1:</b> Tulis bentuk kedua di bawahnya. Suku sejenis harus lurus dalam satu kolom.",
      html: susun([["", "4x", "+3y", "−2"], ["+", "x", "−5y", "+6"]], false) },
    { label: "<b>Langkah 2:</b> Jumlahkan tiap kolom: 4x + x = 5x, 3y − 5y = −2y, −2 + 6 = 4. Selesai!",
      html: susun([["", "4x", "+3y", "−2"], ["+", "x", "−5y", "+6"], ["", "5x", "−2y", "+4"]], true) }
  ]
});

/* =========================================================
   10. HALAMAN CONTOH SOAL: isi pembahasan
   ========================================================= */
Object.assign(DATA_LANGKAH, {
  contoh1: [
    { label: "<b>Langkah 1:</b> Kumpulkan suku sejenis.", eks: "(5x − 2x) + (3 + 4)", tunggal: true },
    { label: "<b>Langkah 2:</b> Hitung: 5 − 2 = 3 dan 3 + 4 = 7.", eks: "3x + 7" }
  ],
  contoh2: [
    { label: "<b>Langkah 1:</b> Kumpulkan suku x dan suku y.", eks: "(6x − x) + (4y − 7y)", tunggal: true },
    { label: "<b>Langkah 2:</b> Hitung: 6 − 1 = 5 dan 4 − 7 = −3.", eks: "5x − 3y" }
  ],
  contoh3: [
    { label: "<b>Langkah 1:</b> Kalikan 4 ke setiap suku dalam kurung.", eks: "4x + 8y − 3x", tunggal: true },
    { label: "<b>Langkah 2:</b> Kumpulkan suku sejenis.", eks: "(4x − 3x) + 8y" },
    { label: "<b>Langkah 3:</b> 4 − 3 = 1, dan 1x cukup ditulis x.", eks: "x + 8y" }
  ],
  contoh4: [
    { label: "<b>Langkah 1:</b> 3 × (2x − 1) = 6x − 3, dan −2 × (x − 4) = −2x <b>+ 8</b>.", eks: "6x − 3 − 2x + 8", tunggal: true },
    { label: "<b>Langkah 2:</b> Kumpulkan suku sejenis.", eks: "(6x − 2x) + (−3 + 8)" },
    { label: "<b>Langkah 3:</b> 6 − 2 = 4 dan −3 + 8 = 5.", eks: "4x + 5" }
  ],
  contoh5: [
    { label: "<b>Langkah 1:</b> Ubah cerita jadi bentuk aljabar: 3 bungkus × (2x + 1), lalu dikurangi x.", eks: "3(2x + 1) − x", tunggal: true },
    { label: "<b>Langkah 2:</b> Kalikan 3 ke dalam kurung.", eks: "6x + 3 − x" },
    { label: "<b>Langkah 3:</b> Kumpulkan dan hitung suku sejenis: 6x − x = 5x.", eks: "5x + 3" }
  ],
  contoh6: [
    { label: "<b>Langkah 1:</b> Keliling persegi panjang = 2 × panjang + 2 × lebar.", eks: "2(2x + 3) + 2(x − 1)", tunggal: true },
    { label: "<b>Langkah 2:</b> Kalikan angka di depan kurung.", eks: "4x + 6 + 2x − 2" },
    { label: "<b>Langkah 3:</b> Kumpulkan suku sejenis.", eks: "(4x + 2x) + (6 − 2)" },
    { label: "<b>Langkah 4:</b> Hitung: 4 + 2 = 6 dan 6 − 2 = 4.", eks: "6x + 4" }
  ]
});

// Pasang semua komponen langkah yang ada di halaman
document.querySelectorAll(".langkah-kotak").forEach(pasangLangkah);

// Warnai semua elemen bertanda data-warnai
document.querySelectorAll("[data-warnai]").forEach((el) => {
  el.innerHTML = warnai(el.dataset.warnai);
});

// Tombol "Lihat Pembahasan" di halaman Contoh Soal
document.querySelectorAll(".tombol-buka").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const bahas = tombol.nextElementSibling;
    const buka = bahas.classList.toggle("buka");
    tombol.textContent = buka ? "Tutup Pembahasan" : "Lihat Pembahasan";
  });
});

/* =========================================================
   11. HALAMAN KUIS
   ========================================================= */
const layarMulai = document.getElementById("layar-mulai");

if (layarMulai) {
  // ---- Bank soal (jawaban = teks pilihan yang benar) ----
  const SOAL = [
    {
      tanya: "Koefisien dari x pada bentuk aljabar 7x − 3y + 2 adalah …",
      opsi: ["7", "−3", "2", "x"], jawaban: "7",
      bahas: "Koefisien adalah angka di depan variabel. Angka di depan x adalah 7."
    },
    {
      tanya: "Manakah pasangan suku sejenis di bawah ini?",
      opsi: ["3x dan 3y", "2x dan 2x²", "4y dan −9y", "5 dan 5a"], jawaban: "4y dan −9y",
      bahas: "4y dan −9y sama-sama memiliki variabel y berpangkat 1. Koefisiennya boleh berbeda."
    },
    {
      tanya: "Bentuk sederhana dari 8x + 3 − 5x + 6 adalah …",
      opsi: ["3x + 9", "13x + 9", "3x − 3", "12x"], jawaban: "3x + 9",
      bahas: "(8x − 5x) + (3 + 6) = 3x + 9."
    },
    {
      tanya: "Hasil dari 4(2x − 3) adalah …",
      opsi: ["8x − 3", "8x − 12", "6x − 12", "8x + 12"], jawaban: "8x − 12",
      bahas: "Kalikan 4 ke setiap suku: 4 × 2x = 8x dan 4 × (−3) = −12."
    },
    {
      tanya: "Hasil dari −2(x − 5) adalah …",
      opsi: ["−2x − 10", "−2x + 10", "2x − 10", "−2x + 5"], jawaban: "−2x + 10",
      bahas: "−2 × x = −2x dan −2 × (−5) = +10, karena negatif × negatif = positif."
    },
    {
      tanya: "Bentuk sederhana dari 6x + 2y − x + 3y adalah …",
      opsi: ["5x + 5y", "7x + 5y", "5x − y", "10xy"], jawaban: "5x + 5y",
      bahas: "(6x − x) + (2y + 3y) = 5x + 5y. Suku x dan y tidak sejenis, jadi tidak boleh digabung menjadi xy."
    },
    {
      tanya: "Bentuk sederhana dari 3(x + 2) + 2(x − 1) adalah …",
      opsi: ["5x + 4", "5x + 8", "5x + 1", "6x + 4"], jawaban: "5x + 4",
      bahas: "3x + 6 + 2x − 2 = (3x + 2x) + (6 − 2) = 5x + 4."
    },
    {
      tanya: "Bentuk sederhana dari 5(x + y) − 3(x − y) adalah …",
      opsi: ["2x + 2y", "2x + 8y", "8x + 2y", "2x − 8y"], jawaban: "2x + 8y",
      bahas: "5x + 5y − 3x + 3y. Ingat −3 × (−y) = +3y. Hasilnya (5x − 3x) + (5y + 3y) = 2x + 8y."
    },
    {
      tanya: "Dina membeli 4 kotak pensil. Setiap kotak berisi (x + 3) pensil. Dina lalu memberikan 5 pensil kepada temannya. Banyak pensil Dina sekarang adalah …",
      opsi: ["4x + 7", "4x − 2", "4x + 12", "x + 7"], jawaban: "4x + 7",
      bahas: "4(x + 3) − 5 = 4x + 12 − 5 = 4x + 7 pensil."
    },
    {
      tanya: "Budi menyederhanakan 7x − 2(x + 4) dan mendapat hasil 5x + 8. Pernyataan yang tepat tentang pekerjaan Budi adalah …",
      opsi: ["Jawaban Budi sudah benar", "Seharusnya 5x − 8, karena −2 × 4 = −8", "Seharusnya 9x + 8", "Seharusnya 5x + 4"],
      jawaban: "Seharusnya 5x − 8, karena −2 × 4 = −8",
      bahas: "7x − 2x − 8 = 5x − 8. Budi lupa bahwa tanda minus di depan 2 ikut dikalikan ke angka 4."
    }
  ];

  const layarSoal = document.getElementById("layar-soal");
  const layarHasil = document.getElementById("layar-hasil");
  const formNama = document.getElementById("form-nama");
  const inputNama = document.getElementById("nama-siswa");
  const errorNama = document.getElementById("error-nama");
  const elNo = document.getElementById("no-soal");
  const elBilah = document.getElementById("bilah-isi");
  const elTanya = document.getElementById("soal-teks");
  const elOpsi = document.getElementById("opsi-grid");
  const elBahas = document.getElementById("penjelasan-soal");
  const tombolBerikut = document.getElementById("tombol-berikut");

  let nama = "";
  let nomor = 0;
  let jawabanSiswa = [];

  // nama terakhir diingat di browser (kalau bisa)
  try { inputNama.value = localStorage.getItem("namaSiswaAljabar") || ""; } catch (e) {}

  function pindahLayar(layar) {
    [layarMulai, layarSoal, layarHasil].forEach((l) => l.classList.remove("aktif"));
    layar.classList.add("aktif");
    layar.closest(".kotak").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function acakUrutan(daftar) {
    return daftar.map((a) => [Math.random(), a]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  }

  // ---- Layar 1: cek nama ----
  inputNama.addEventListener("input", () => {
    errorNama.textContent = "";
    inputNama.classList.remove("error");
  });

  formNama.addEventListener("submit", (e) => {
    e.preventDefault();
    const isi = inputNama.value.trim();
    if (isi.length < 2) {
      errorNama.textContent = isi ? "Nama terlalu pendek. Tulis minimal 2 huruf, ya." : "Tulis namamu dulu sebelum mulai kuis, ya.";
      inputNama.classList.add("error");
      inputNama.focus();
      return;
    }
    nama = isi;
    try { localStorage.setItem("namaSiswaAljabar", nama); } catch (e2) {}
    document.getElementById("sapa-nama").textContent = nama.split(" ")[0];
    mulaiKuis();
  });

  function mulaiKuis() {
    nomor = 0;
    jawabanSiswa = [];
    pindahLayar(layarSoal);
    tampilSoal();
  }

  // ---- Layar 2: tampilkan soal ----
  function tampilSoal() {
    const s = SOAL[nomor];
    elNo.textContent = nomor + 1;
    elBilah.style.width = `${(nomor / SOAL.length) * 100}%`;
    elTanya.textContent = `${nomor + 1}. ${s.tanya}`;
    elBahas.className = "penjelasan-soal";
    tombolBerikut.style.display = "none";

    elOpsi.innerHTML = "";
    acakUrutan(s.opsi).forEach((teks, i) => {
      const b = document.createElement("button");
      b.className = "opsi";
      b.innerHTML = `<span class="huruf">${"ABCD"[i]}</span><span>${teks}</span>`;
      b.dataset.teks = teks;
      b.addEventListener("click", () => pilihJawaban(b));
      elOpsi.appendChild(b);
    });
  }

  function pilihJawaban(tombol) {
    const s = SOAL[nomor];
    const dipilih = tombol.dataset.teks;
    const benar = dipilih === s.jawaban;
    jawabanSiswa.push({ dipilih, benar });

    elOpsi.querySelectorAll(".opsi").forEach((b) => {
      b.disabled = true;
      if (b.dataset.teks === s.jawaban) b.classList.add("benar");
    });
    if (!benar) tombol.classList.add("salah");

    elBahas.innerHTML = (benar ? "<b>Benar!</b> " : `<b>Belum tepat.</b> Jawaban yang benar: <b>${s.jawaban}</b>. `) + s.bahas;
    elBahas.className = `penjelasan-soal tampil ${benar ? "ok" : "kurang"}`;
    elBilah.style.width = `${((nomor + 1) / SOAL.length) * 100}%`;

    tombolBerikut.textContent = nomor === SOAL.length - 1 ? "Lihat Nilaiku →" : "Soal Berikutnya →";
    tombolBerikut.style.display = "";
  }

  tombolBerikut.addEventListener("click", () => {
    if (nomor < SOAL.length - 1) { nomor++; tampilSoal(); }
    else tampilHasil();
  });

  // ---- Layar 3: hasil ----
  function tampilHasil() {
    const jumlahBenar = jawabanSiswa.filter((j) => j.benar).length;
    const nilai = jumlahBenar * 10;
    const namaDepan = nama.split(" ")[0];
    const inisial = nama.split(/\s+/).slice(0, 2).map((k) => k[0]).join("").toUpperCase();

    let pesanJihan, pesanSiswa, bintang;
    if (nilai >= 90) {
      pesanJihan = `Luar biasa, ${namaDepan}! Nilaimu ${nilai}. Kamu sudah jago menyederhanakan aljabar!`;
      pesanSiswa = `Yeay! Nilaiku ${nilai}! Terima kasih, Kak Jihan!`; bintang = 3;
    } else if (nilai >= 70) {
      pesanJihan = `Hebat, ${namaDepan}! Nilaimu ${nilai}. Sedikit lagi jadi sempurna!`;
      pesanSiswa = `Nilaiku ${nilai}! Aku akan cek lagi soal yang salah.`; bintang = 2;
    } else if (nilai >= 50) {
      pesanJihan = `Lumayan, ${namaDepan}! Nilaimu ${nilai}. Ayo pelajari lagi bagian tanda negatif dan distributif.`;
      pesanSiswa = `Nilaiku ${nilai}. Aku mau belajar lagi supaya lebih baik!`; bintang = 1;
    } else {
      pesanJihan = `Jangan menyerah, ${namaDepan}! Nilaimu ${nilai}. Yuk baca lagi materinya, lalu coba sekali lagi.`;
      pesanSiswa = `Nilaiku ${nilai}. Aku akan belajar lagi dan mencoba lagi!`; bintang = 0;
    }

    document.getElementById("ucapan-jihan").textContent = pesanJihan;
    document.getElementById("ucapan-siswa").textContent = pesanSiswa;
    document.getElementById("inisial-siswa").textContent = inisial;
    document.getElementById("nama-hasil").textContent = nama;
    document.getElementById("jumlah-benar").textContent = jumlahBenar;
    document.getElementById("jumlah-salah").textContent = SOAL.length - jumlahBenar;
    document.getElementById("nilai-kecil").textContent = nilai;
    document.getElementById("bintang").innerHTML =
      [0, 1, 2].map((i) => `<span class="${i < bintang ? "" : "mati"}">★</span>`).join("");

    // daftar pembahasan
    document.getElementById("daftar-bahas").innerHTML = "<h3 style='margin-bottom:12px'>Pembahasan Semua Soal</h3>" +
      SOAL.map((s, i) => {
        const j = jawabanSiswa[i];
        return `<div class="bahas-item ${j.benar ? "" : "salah"}">
          <p class="q">${i + 1}. ${s.tanya}</p>
          <p>Jawabanmu: <b>${j.dipilih}</b> ${j.benar ? "✓" : "✗"}</p>
          ${j.benar ? "" : `<p>Jawaban benar: <b>${s.jawaban}</b></p>`}
          <p>${s.bahas}</p>
        </div>`;
      }).join("");
    document.getElementById("daftar-bahas").classList.remove("buka");
    document.getElementById("tombol-bahas").textContent = "Lihat Pembahasan";

    pindahLayar(layarHasil);
    animasiNilai(nilai);
    if (nilai >= 70) konfeti();
  }

  // angka nilai naik pelan-pelan
  function animasiNilai(target) {
    const lingkar = document.getElementById("lingkar-nilai");
    const angka = document.getElementById("angka-nilai");
    let sekarang = 0;
    const jalan = setInterval(() => {
      sekarang = Math.min(sekarang + 2, target);
      angka.textContent = sekarang;
      lingkar.style.setProperty("--persen", sekarang);
      if (sekarang >= target) clearInterval(jalan);
    }, 25);
    if (target === 0) { angka.textContent = 0; lingkar.style.setProperty("--persen", 0); }
  }

  // hujan konfeti sederhana
  function konfeti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kanvas = document.createElement("canvas");
    kanvas.id = "konfeti";
    document.body.appendChild(kanvas);
    const ctx = kanvas.getContext("2d");
    kanvas.width = innerWidth; kanvas.height = innerHeight;
    const warna = ["#8b5cf6", "#c4b5fd", "#1f6fd1", "#d9730d", "#1e8a4c", "#facc15", "#f0abfc"];
    const kertas = Array.from({ length: 140 }, () => ({
      x: Math.random() * kanvas.width, y: Math.random() * -kanvas.height,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      vy: 2 + Math.random() * 3, vx: -1 + Math.random() * 2,
      r: Math.random() * Math.PI, vr: -0.1 + Math.random() * 0.2,
      c: warna[Math.floor(Math.random() * warna.length)]
    }));
    const mulai = performance.now();
    (function gerak(t) {
      ctx.clearRect(0, 0, kanvas.width, kanvas.height);
      kertas.forEach((k) => {
        k.x += k.vx; k.y += k.vy; k.r += k.vr;
        ctx.save(); ctx.translate(k.x, k.y); ctx.rotate(k.r);
        ctx.fillStyle = k.c; ctx.fillRect(-k.w / 2, -k.h / 2, k.w, k.h); ctx.restore();
      });
      if (t - mulai < 4000) requestAnimationFrame(gerak);
      else kanvas.remove();
    })(mulai);
  }

  document.getElementById("tombol-bahas").addEventListener("click", (e) => {
    const daftar = document.getElementById("daftar-bahas");
    const buka = daftar.classList.toggle("buka");
    e.target.textContent = buka ? "Tutup Pembahasan" : "Lihat Pembahasan";
  });
  document.getElementById("tombol-ulang").addEventListener("click", mulaiKuis);
}
