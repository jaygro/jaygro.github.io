import { plantData } from './plantData.js';

let bedCount = 1;

function populateCropDropdowns() {
  console.log('Starting populateCropDropdowns...');
  try {
    if (!plantData) throw new Error('plantData is not loaded!');
    const crops = Object.keys(plantData).sort();
    console.log('Crop names extracted (sorted):', crops);
    const defaultOption = '<option value="">Select a crop</option>';
    const options = defaultOption + crops.map(crop => `<option value="${crop}">${crop}</option>`).join('');
    console.log('Generated options HTML:', options);
    const dropdowns = document.querySelectorAll('.crop-select');
    console.log('Found dropdowns:', dropdowns.length);
    if (dropdowns.length === 0) console.warn('No .crop-select elements found!');
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
      <label>Bed Name:</label><br>
      <input type="text" name="bedName" placeholder="e.g., Backyard Bed ${bedCount}" required><br>
      <label>Dimensions (<span class="unit-label">${unit}</span>):</label><br>
      <input type="number" name="length" placeholder="Length" required> x 
      <input type="number" name="width" placeholder="Width" required><br>
      <label>Crop:</label><br>
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
    const addBedButton = document.getElementById('addBedButton');
    if (addBedButton) {
      console.log('Add Bed button found, attaching listener');
      addBedButton.addEventListener('click', () => addBed());
    } else {
      console.error('Error: Add Bed button not found!');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});