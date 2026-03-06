const btn = document.getElementById('btn');
const meddelande = document.getElementById('meddelande');

btn.addEventListener('click', () => {
  meddelande.textContent = 'Du klickade! Det funkar!';
});
