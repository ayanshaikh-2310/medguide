window.addEventListener('DOMContentLoaded', async () => {
    // 1) Grab your UI elements:
    const searchBtn = document.getElementById('searchBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const fileInput = document.getElementById('fileInput');
    const langButtons = document.querySelectorAll('.language-btn');
    const medInput = document.getElementById('medicineInput');
    const resultCard = document.getElementById('resultCard');
    const loading = document.getElementById('loading');
    const audioBtn = document.getElementById('audioBtn');
    let currentLang = 'en';

    // 2) Load the external JSON data
    let medicineData = {};
    try {
        const resp = await fetch('data/medicineData.json');
        medicineData = await resp.json();
    } catch (err) {
        console.error('JSON load error:', err);
        alert('Failed to load medicine data.');
        return;
    }

    // 3) Helper: render a given language block
    function renderMedicine(data) {
        document.getElementById('medName').innerText = data.name;
        document.getElementById('medCategory').innerText = data.category;
        document.getElementById('medUse').innerText = data.use;
        document.getElementById('adultDose').innerText = data.adultDose;
        document.getElementById('whenToTake').innerText = data.whenToTake;
        document.getElementById('warnings').innerText = data.warnings;

        const ul = document.getElementById('sideEffects');
        ul.innerHTML = '';
        (data.sideEffects || []).forEach(e => {
            const li = document.createElement('li');
            li.textContent = e;
            ul.appendChild(li);
        });

        const warnul = document.getElementById('warnings');
        warnul.innerHTML = '';
        (data.warnings || []).forEach(w => {
            const li = document.createElement('li');
            li.textContent = w;
            warnul.appendChild(li);
        });



    }

    // 4) Search button logic
    searchBtn.addEventListener('click', () => {
        const key = medInput.value.trim().toLowerCase();
        if (!medicineData[key]) {
            alert('Medicine not found.');
            return;
        }
        loading.style.display = 'block';
        resultCard.style.display = 'none';
        // simulate delay
        setTimeout(() => {
            renderMedicine(medicineData[key][currentLang]);
            resultCard.style.display = 'block';
            loading.style.display = 'none';
        }, 500);
    });

    // 5) Language switching
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            // if results already shown, re-render
            const key = medInput.value.trim().toLowerCase();
            if (medicineData[key] && resultCard.style.display === 'block') {
                renderMedicine(medicineData[key][currentLang]);
            }
        });
    });

    audioBtn.addEventListener('click', () => {
        const medName = document.getElementById('medName').innerText;
        const medUse = document.getElementById('medUse').innerText;
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(`${medName},${medUse}`);
        synth.speak(utterThis);
    });

    // --- 6) Theme toggle (dark/light) ---
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // --- 7) Camera / OCR with Tesseract.js ---
    cameraBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async e => {
        const file = e.target.files[0];
        if (!file) return;
        loading.style.display = 'block';
        resultCard.style.display = 'none';

        try {
            const { data: { text } } = await Tesseract.recognize(file, 'eng', {});
            // look for one of our keys
            const found = text.toLowerCase().match(/paracetamol|ibuprofen|cetirizine|amoxicillin|omeprazole/);
            if (found) {
                medicineInput.value = found[0];
                searchBtn.click();
            } else {
                alert("Couldn’t detect a known medicine name. Try again.");
                loading.style.display = 'none';
            }
        } catch (err) {
            alert("OCR failed: " + err.message);
            loading.style.display = 'none';
        }
    });

});





























































// // Wait for the DOM to load
// window.addEventListener('DOMContentLoaded', () => {
//     const themeToggle = document.getElementById('themeToggle');
//     const cameraBtn = document.getElementById('cameraBtn');
//     const searchBtn = document.getElementById('searchBtn');
//     const languageButtons = document.querySelectorAll('.language-btn');
//     const medicineInput = document.getElementById('medicineInput');
//     const resultCard = document.getElementById('resultCard');
//     const loading = document.getElementById('loading');
//     const audioBtn = document.getElementById('audioBtn');

//     // Dummy medicine data
//     const medicineData = {
//         "paracetamol": {
//             name: "Paracetamol",
//             category: "Pain Reliever",
//             use: "This medicine is used to reduce fever and relieve mild to moderate pain from conditions such as muscle aches, headaches, common cold, and toothaches.",
//             adultDose: "1-2 tablets every 4-6 hours as needed (max 8 tablets in 24 hours)",
//             whenToTake: "With or without food. Take with food if stomach upset occurs.",
//             sideEffects: [
//                 "Nausea or vomiting",
//                 "Rash",
//                 "Liver damage (if overdosed)"
//             ]
//         },
//         "ibuprofen": {
//             name: "Ibuprofen",
//             category: "Pain Reliever / Anti-inflammatory",
//             use: "Used to reduce fever, pain, and inflammation caused by various conditions such as headache, toothache, arthritis, or minor injury.",
//             adultDose: "200-400 mg every 4-6 hours as needed (max 1200 mg in 24 hours without prescription)",
//             whenToTake: "Take with food or milk to avoid stomach upset.",
//             sideEffects: [
//                 "Stomach pain",
//                 "Heartburn",
//                 "Nausea",
//                 "Increased risk of bleeding or ulcers (with prolonged use)"
//             ]
//         }
//     };

//     // Theme Toggle
//     themeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('dark-mode');
//         const icon = themeToggle.querySelector('i');
//         icon.classList.toggle('fa-moon');
//         icon.classList.toggle('fa-sun');
//     });

//     // Translation API call
//     function translateText(text, targetLang) {
//         return fetch('https://translate.argosopentech.com/translate', {
//             method: 'POST',
//             body: JSON.stringify({
//                 q: text,
//                 source: 'hi',
//                 target: targetLang,
//                 format: 'text'
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(res => res.json())
//             .then(data => data.translatedText);
//     }

//     // Translate result card
//     async function translateCard(langCode) {
//         const medName = document.getElementById('medName');
//         const medCategory = document.getElementById('medCategory');
//         const medUse = document.getElementById('medUse');
//         const adultDose = document.getElementById('adultDose');
//         const whenToTake = document.getElementById('whenToTake');
//         const sideEffects = document.querySelectorAll('#sideEffects li');

//         medName.innerText = await translateText(medName.innerText, langCode);
//         medCategory.innerText = await translateText(medCategory.innerText, langCode);
//         medUse.innerText = await translateText(medUse.innerText, langCode);
//         adultDose.innerText = await translateText(adultDose.innerText, langCode);
//         whenToTake.innerText = await translateText(whenToTake.innerText, langCode);

//         for (const li of sideEffects) {
//             li.innerText = await translateText(li.innerText, langCode);
//         }
//     }

//     // Language switching
//     languageButtons.forEach(btn => {
//         btn.addEventListener('click', async () => {
//             languageButtons.forEach(b => b.classList.remove('active'));
//             btn.classList.add('active');

//             const selectedLang = btn.dataset.langcode;
//             if (selectedLang !== 'en') {
//                 await translateCard(selectedLang);
//             } else {
//                 searchBtn.click(); // reload in English
//             }
//         });
//     });

//     // Search
//     searchBtn.addEventListener('click', () => {
//         const query = medicineInput.value.trim().toLowerCase();
//         if (!query) return;

//         loading.style.display = 'block';
//         resultCard.style.display = 'none';

//         setTimeout(() => {
//             const data = medicineData[query];
//             if (data) {
//                 document.getElementById('medName').innerText = data.name;
//                 document.getElementById('medCategory').innerText = data.category;
//                 document.getElementById('medUse').innerText = data.use;
//                 document.getElementById('adultDose').innerText = data.adultDose;
//                 document.getElementById('whenToTake').innerText = data.whenToTake;

//                 const sideEffectsList = document.getElementById('sideEffects');
//                 sideEffectsList.innerHTML = '';
//                 data.sideEffects.forEach(effect => {
//                     const li = document.createElement('li');
//                     li.textContent = effect;
//                     sideEffectsList.appendChild(li);
//                 });

//                 resultCard.style.display = 'block';
//             } else {
//                 alert("Medicine not found. Please try another.");
//             }
//             loading.style.display = 'none';
//         }, 1000);
//     });

//     // Text-to-Speech
//     audioBtn.addEventListener('click', () => {
//         const medName = document.getElementById('medName').innerText;
//         const medUse = document.getElementById('medUse').innerText;
//         const synth = window.speechSynthesis;
//         const utterThis = new SpeechSynthesisUtterance(`${medName}, ${medUse}`);
//         synth.speak(utterThis);
//     });

//     // Camera functionality
//     cameraBtn.addEventListener('click', () => {
//         document.getElementById('fileInput').click();
//     });

//     // Simulated OCR for now
//     document.getElementById('fileInput').addEventListener('change', (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             loading.style.display = 'block';
//             resultCard.style.display = 'none';

//             setTimeout(() => {
//                 medicineInput.value = 'Paracetamol';
//                 searchBtn.click();
//             }, 1500);
//         }
//     });
// });