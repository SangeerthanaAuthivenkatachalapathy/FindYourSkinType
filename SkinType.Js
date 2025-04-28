const options = document.querySelectorAll('.option');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');

let answers = [];

options.forEach(option => {
  option.addEventListener('click', () => {
    const parent = option.parentElement;
    Array.from(parent.children).forEach(child => child.classList.remove('selected'));
    option.classList.add('selected');
    const questionIndex = Array.from(document.querySelectorAll('.options')).indexOf(parent);
    answers[questionIndex] = option.getAttribute('data-value');
  });
});

submitBtn.addEventListener('click', () => {
  if (answers.length < 5 || answers.includes(undefined)) {
    alert('Please answer all questions!');
    return;
  }

  const counts = { oily: 0, dry: 0, normal: 0, combination: 0 };
  answers.forEach(ans => counts[ans]++);

  let skinType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  let tips = {
    oily: "Tip: Use light, oil-free moisturizers and gentle cleansers!",
    dry: "Tip: Use heavy moisturizers and avoid harsh soaps!",
    normal: "Tip: Maintain balance with mild products!",
    combination: "Tip: Use different products for different areas!"
  };

  resultDiv.innerHTML = `<h2>Your Skin Type is: ${skinType.charAt(0).toUpperCase() + skinType.slice(1)}</h2><p>${tips[skinType]}</p>`;
  resultDiv.style.display = 'block';
  submitBtn.style.display = 'none';
  resetBtn.style.display = 'block';
});

resetBtn.addEventListener('click', () => {
  answers = [];
  options.forEach(option => option.classList.remove('selected'));
  resultDiv.style.display = 'none';
  submitBtn.style.display = 'block';
  resetBtn.style.display = 'none';
});
