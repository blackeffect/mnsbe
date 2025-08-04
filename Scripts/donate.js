// Get modal and buttons
const modal = document.getElementById('donateModal');
const openBtn1 = document.getElementById('openDonateModal');
const openBtn2 = document.getElementById('openDonateModalHero');
const closeBtn = document.getElementById('closeDonateModal');

openBtn1.addEventListener('click', () => {
  modal.style.display = 'block';
});

openBtn2.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

// Optional: handle form submit
document.getElementById('donationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your donation!');
  modal.style.display = 'none';
});
