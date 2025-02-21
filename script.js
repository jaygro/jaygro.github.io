import { plantData } from './plantData.js';

let bedCount = 1;
let currentLanguage = 'en';

const translations = {
  en: {
    title: "Garden Planner",
    language: "Language:",
    growingZone: "Growing Zone:",
    selectZone: "Select Zone",
    measurementUnit: "Measurement Unit:",
    gardenBeds: "Garden Beds",
    bedName: "Bed Name:",
    dimensions: "Dimensions",
    crop: "Crop:",
    addBed: "Add Another Bed",
    planGarden: "Plan My Garden",
    downloadCalendar: "Download Calendar"
  },
  es: {
    title: "Planificador de Jardín",
    language: "Idioma:",
    growingZone: "Zona de Crecimiento:",
    selectZone: "Seleccionar Zona",
    measurementUnit: "Unidad de Medida:",
    gardenBeds: "Camas de Jardín",
    bedName: "Nombre de la Cama:",
    dimensions: "Dimensiones",
    crop: "Cultivo:",
    addBed: "Agregar Otra Cama",
    planGarden: "Planificar Mi Jardín",
    downloadCalendar: "Descargar Calendario"
  }
};

const cropTranslations = {
  'en': {
    'sweet potato': 'Sweet Potato',
    'beets': 'Beets',
    'carrots': 'Carrots',
    'potatoes': 'Potatoes'
  },
  'es': {
    'sweet potato': 'Batata',
    'beets': 'Remolachas',
    'carrots': 'Zanahorias',
    'potatoes': 'Papas'
  }
};

function updateTranslations() {
  console.log('Updating translations for:', currentLanguage);
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[currentLanguage][key] || element.textContent;
    if (key === 'dimensions') {
      const unit = document.getElementById('unit').value;
      element.innerHTML = `${translations[currentLanguage][key]} (<span class="unit-label">${unit}</span>)`;
    }
  });
}

function populateCropDropdowns() {
  console.log('Starting populateCropDropdowns...');
  try {
    if (!plantData) throw new Error('plantData is not loaded!');
    const crops = Object.keys(plantData).sort();
    console.log('Crop names extracted (sorted):', crops);
    const defaultOption = `<option value="">${translations[currentLanguage].crop}</option>`;
    const options = defaultOption + crops.map(crop => {
      const displayName = cropTranslations[currentLanguage][crop] || crop;
      return `<option value="${crop}">${displayName}</option>`;
    }).join('');
    console.log('Generated options HTML:', options);
    const dropdowns = document.querySelectorAll('.crop-select');
    console.log('Found dropdowns:', dropdowns.length);
    dropdowns.forEach(select => select.innerHTML = options);
  } catch (error) {
    console.error('Error in populateCropDropdowns:', error);
  }
}

function updateUnitLabels() {
  console.log('Starting updateUnitLabels...');
  try {
    const unit = document.getElementById('unit').value;
    console.log('Selected unit:', unit);
    const labels = document.querySelectorAll('.unit-label');
    console.log('Found unit labels:', labels.length);
    labels.forEach(label => label.textContent = unit);
    updateTranslations(); // Refresh dimensions labels
  } catch (error) {
    console.error('Error in updateUnitLabels:', error);
  }
}

function addBed() {
  console.log('Adding new bed...');
  try {
    bedCount++;
    const container = document.getElementById('bedsContainer');
    if (!container) throw new Error('bedsContainer not found!');
    const unit = document.getElementById('unit').value || 'ft';
    const newBed = document.createElement('div');
    newBed.className = 'bed';
    newBed.innerHTML = `
      <label data-translate="bedName">${translations[currentLanguage].bedName}</label><br>
      <input type="text" name="bedName" placeholder="e.g., Backyard Bed ${bedCount}" required><br>
      <label data-translate="dimensions">${translations[currentLanguage].dimensions} (<span class="unit-label">${unit}</span>):</label><br>
      <input type="number" name="length" placeholder="Length" required> x 
      <input type="number" name="width" placeholder="Width" required><br>
      <label data-translate="crop">${translations[currentLanguage].crop}</label><br>
      <select name="crop" class="crop-select"></select><br>
    `;
    container.appendChild(newBed);
    populateCropDropdowns();
  } catch (error) {
    console.error('Error in addBed:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing...');
  try {
    updateUnitLabels();
    populateCropDropdowns();
    updateTranslations();
    const addBedButton = document.getElementById('addBedButton');
    if (addBedButton) {
      console.log('Add Bed button found, attaching listener');
      addBedButton.addEventListener('click', () => addBed());
    }
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
      console.log('Language select found, attaching listener');
      languageSelect.addEventListener('change', () => {
        currentLanguage = languageSelect.value;
        updateTranslations();
        populateCropDropdowns();
      });
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});