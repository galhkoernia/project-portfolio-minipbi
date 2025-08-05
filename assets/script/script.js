//* Port Folio GALH KURNIA *//
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector(".hero-text");
    heroText.classList.add("fade-in");
});

//* FOTO SECTION ABOUT FOTO *//
function setPreview(id, src) {
    const img = document.getElementById(id);
    img.src = src;
    img.style.display = 'block';
}

function toggleDocList() {
    const list = document.getElementById("edu-doc-list");
    list.style.display = list.style.display === "none" ? "block" : "none";
}

async function loadEducationalDocs() {
    const list = document.getElementById("edu-doc-list");
    const response = await fetch('/documents');
    const files = await response.json();

    files.forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/documents/${file}`;
        link.textContent = file;
        link.target = '_blank';
        li.appendChild(link);
        list.appendChild(li);
    });
}

function setPreview(id, src) {
    const img = document.getElementById(id);
    img.src = src;
    img.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', loadEducationalDocs);
function toggleDocList() {
    const list = document.getElementById('edu-doc-list');
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

// Fungsi Klik pada Dokumen Projekk //
function toggleDropdown(dropdownEl, listId) {
    const list = document.getElementById(listId);
    const isOpen = list.style.display === 'block';

    // Tutup semua panel aktif
    document.querySelectorAll('.doc-list').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.dropdown').forEach(el => el.classList.remove('open'));

    // Jika belum terbuka, buka panel ini
    if (!isOpen) {
        list.style.display = 'block';
        dropdownEl.classList.add('open');
    }
}

