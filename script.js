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
    'potatoes': 'Potatoes',
    'radishes': 'Radishes',
    'parsnips': 'Parsnips',
    'turnips': 'Turnips',
    'rutabaga': 'Rutabaga',
    'onions': 'Onions',
    'garlic': 'Garlic',
    'leeks': 'Leeks',
    'spinach': 'Spinach',
    'lettuce': 'Lettuce',
    'kale': 'Kale',
    'swiss chard': 'Swiss Chard',
    'arugula': 'Arugula',
    'mustard greens': 'Mustard Greens',
    'collards': 'Collards',
    'tomatoes': 'Tomatoes',
    'peppers': 'Peppers',
    'zucchini': 'Zucchini',
    'cucumbers': 'Cucumbers',
    'eggplant': 'Eggplant',
    'squash': 'Squash',
    'pumpkin': 'Pumpkin',
    'watermelon': 'Watermelon',
    'cantaloupe': 'Cantaloupe',
    'okra': 'Okra',
    'broccoli': 'Broccoli',
    'cauliflower': 'Cauliflower',
    'cabbage': 'Cabbage',
    'brussels sprouts': 'Brussels Sprouts',
    'kohlrabi': 'Kohlrabi',
    'beans': 'Beans',
    'peas': 'Peas',
    'lima beans': 'Lima Beans',
    'fava beans': 'Fava Beans',
    'basil': 'Basil',
    'dill': 'Dill',
    'thyme': 'Thyme',
    'oregano': 'Oregano',
    'parsley': 'Parsley',
    'cilantro': 'Cilantro',
    'mint': 'Mint',
    'rosemary': 'Rosemary',
    'sage': 'Sage',
    'chives': 'Chives',
    'strawberries': 'Strawberries',
    'raspberries': 'Raspberries',
    'blackberries': 'Blackberries',
    'blueberries': 'Blueberries',
    'marigolds': 'Marigolds',
    'nasturtiums': 'Nasturtiums',
    'sunflowers': 'Sunflowers',
    'zinnias': 'Zinnias',
    'cosmos': 'Cosmos',
    'calendula': 'Calendula',
    'corn': 'Corn',
    'asparagus': 'Asparagus',
    'artichoke': 'Artichoke'
  },
  'es': {
    'sweet potato': 'Batata',
    'beets': 'Remolachas',
    'carrots': 'Zanahorias',
    'potatoes': 'Papas',
    'radishes': 'Rábanos',
    'parsnips': 'Chirivías',
    'turnips': 'Nabos',
    'rutabaga': 'Colinabo Sueco',
    'onions': 'Cebollas',
    'garlic': 'Ajo',
    'leeks': 'Puerros',
    'spinach': 'Espinacas',
    'lettuce': 'Lechuga',
    'kale': 'Col Rizada',
    'swiss chard': 'Acelga',
    'arugula': 'Rúcula',
    'mustard greens': 'Hojas de Mostaza',
    'collards': 'Coles de Hoja',
    'tomatoes': 'Tomates',
    'peppers': 'Pimientos',
    'zucchini': 'Calabacín',
    'cucumbers': 'Pepinos',
    'eggplant': 'Berenjena',
    'squash': 'Calabaza',
    'pumpkin': 'Calabaza de Invierno',
    'watermelon': 'Sandía',
    'cantaloupe': 'Melón Cantalupo',
    'okra': 'Okra',
    'broccoli': 'Brócoli',
    'cauliflower': 'Coliflor',
    'cabbage': 'Repollo',
    'brussels sprouts': 'Coles de Bruselas',
    'kohlrabi': 'Colinabo',
    'beans': 'Frijoles',
    'peas': 'Guisantes',
    'lima beans': 'Frijoles de Lima',
    'fava beans': 'Habas',
    'basil': 'Albahaca',
    'dill': 'Eneldo',
    'thyme': 'Tomillo',
    'oregano': 'Orégano',
    'parsley': 'Perejil',
    'cilantro': 'Cilantro',
    'mint': 'Menta',
    'rosemary': 'Romero',
    'sage': 'Salvia',
    'chives': 'Cebollinos',
    'strawberries': 'Fresas',
    'raspberries': 'Frambuesas',
    'blackberries': 'Moras',
    'blueberries': 'Arándanos',
    'marigolds': 'Caléndulas',
    'nasturtiums': 'Capuchinas',
    'sunflowers': 'Girasoles',
    'zinnias': 'Zinnias',
    'cosmos': 'Cosmos',
    'calendula': 'Caléndula',
    'corn': 'Maíz',
    'asparagus': 'Espárragos',
    'artichoke': 'Alcachofa'
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

document.getElementById('gardenForm').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Form submitted, processing...');
  try {
    const zone = document.getElementById('zone').value;
    const unit = document.getElementById('unit').value;
    console.log('Zone:', zone, 'Unit:', unit);

    const unitToSqFt = { 'ft': 1, 'in': 1 / 144, 'cm': 1 / 929.03, 'm': 10.7639 };
    const sqFtToInches = 144;
    const sqFtToCm = 929.03;

    const beds = Array.from(document.querySelectorAll('.bed')).map((bed, index) => {
      const name = bed.querySelector('input[name="bedName"]').value;
      const length = parseFloat(bed.querySelector('input[name="length"]').value);
      const width = parseFloat(bed.querySelector('input[name="width"]').value);
      
      if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0) {
        throw new Error(`Invalid dimensions for bed "${name || `Bed ${index + 1}`}": Length and width must be positive numbers.`);
      }

      const area = (length * width) * unitToSqFt[unit];
      const crop = bed.querySelector('select[name="crop"]').value;
      console.log(`Bed ${index + 1}:`, { name, length, width, area, crop });
      return { id: name || `Bed ${index + 1}`, length, width, area, crop: crop || null };
    });

    const zoneShift = {
      '1a': 8, '1b': 7, '2a': 6, '2b': 6, '3a': 5, '3b': 5, '4a': 4, '4b': 4,
      '5a': 3, '5b': 3, '6a': 2, '6b': 2, '7a': 0, '7b': 0, '8a': -1, '8b': -1,
      '9a': -2, '9b': -2, '10a': -3, '10b': -3, '11a': -4, '11b': -4, '12a': -5, '12b': -5,
      '13a': -6, '13b': -6
    };

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let tasks = [];
    beds.forEach(bed => {
      if (bed.crop && plantData[bed.crop]) {
        const data = plantData[bed.crop];
        const plantsPerBed = Math.floor(bed.area / data.spacing);
        const shift = zoneShift[zone];
        const cropName = cropTranslations[currentLanguage][bed.crop].toLowerCase();
        const pluralCropName = cropName.endsWith('s') ? cropName : `${cropName}s`;

        const isImperial = (unit === 'ft' || unit === 'in');
        const spacingUnit = isImperial ? 'inches' : 'cm';
        const conversionFactor = isImperial ? sqFtToInches : sqFtToCm;
        const baseSpacing = Math.sqrt(data.spacing);
        const plantSpacing = Math.round(baseSpacing * 12 * Math.sqrt(conversionFactor / 144));
        const rowSpacing = Math.round(baseSpacing * 18 * Math.sqrt(conversionFactor / 144));
        const spacingInfo = `Row Spacing - ${rowSpacing} ${spacingUnit} between rows, ${plantSpacing} ${spacingUnit} between plants`;

        const adjustWeeks = (taskData) => {
          let { week, month } = taskData;
          let totalWeeks = (new Date(`${month} 1, ${new Date().getFullYear()}`).getMonth() * 4) + week + shift;
          while (totalWeeks < 1) totalWeeks += 48;
          while (totalWeeks > 48) totalWeeks -= 48;
          const newMonthNum = Math.floor((totalWeeks - 1) / 4);
          const newWeek = totalWeeks - (newMonthNum * 4);
          return { text: `Week ${newWeek} of ${months[newMonthNum]}`, totalWeeks, monthNum: newMonthNum + 1, weekNum: newWeek };
        };

        if (data.startIndoors) {
          const { text, totalWeeks, monthNum, weekNum } = adjustWeeks(data.startIndoors);
          tasks.push({ 
            text: `${text} Start ${plantsPerBed} ${pluralCropName} for bed ${bed.id}`, 
            totalWeeks, 
            summary: `Start ${plantsPerBed} ${pluralCropName}`, 
            description: `For bed ${bed.id}`, 
            monthNum, 
            weekNum 
          });
        }
        if (data.transplant) {
          const { text, totalWeeks, monthNum, weekNum } = adjustWeeks(data.transplant);
          tasks.push({ 
            text: `${text} Transplant ${plantsPerBed} ${pluralCropName} into bed ${bed.id}, ${spacingInfo}`, 
            totalWeeks, 
            summary: `Transplant ${plantsPerBed} ${pluralCropName}`, 
            description: `Into bed ${bed.id}, ${spacingInfo}`, 
            monthNum, 
            weekNum 
          });
        }
        if (data.sow) {
          const { text, totalWeeks, monthNum, weekNum } = adjustWeeks(data.sow);
          tasks.push({ 
            text: `${text} Sow ${plantsPerBed} ${pluralCropName} for bed ${bed.id}, ${spacingInfo}`, 
            totalWeeks, 
            summary: `Sow ${plantsPerBed} ${pluralCropName}`, 
            description: `For bed ${bed.id}, ${spacingInfo}`, 
            monthNum, 
            weekNum 
          });
        }
        if (data.harvest) {
          const { text, totalWeeks, monthNum, weekNum } = adjustWeeks(data.harvest);
          tasks.push({ 
            text: `${text} Harvest your ${pluralCropName} from bed ${bed.id}`, 
            totalWeeks, 
            summary: `Harvest ${plantsPerBed} ${pluralCropName}`, 
            description: `From bed ${bed.id}`, 
            monthNum, 
            weekNum 
          });
        }
      }
    });

    tasks.sort((a, b) => a.totalWeeks - b.totalWeeks);

    console.log('Generated tasks (sorted):', tasks);
    document.getElementById('taskList').innerHTML = `<h2>${translations[currentLanguage].tasks || 'Tasks:'}</h2><ul>` +
      tasks.map(task => `<li>${task.text}</li>`).join('') + '</ul>';

    generateICS(tasks);
  } catch (error) {
    console.error('Error in form submission:', error);
    alert(error.message);
    document.getElementById('taskList').innerHTML = '';
  }
});

function generateICS(tasks) {
  console.log('Generating ICS file...');
  try {
    const monthToNum = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
      'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const year = new Date().getFullYear();

    // Function to fold lines longer than 75 characters
    const foldLine = (line) => {
      if (line.length <= 75) return line;
      const folded = [];
      let current = line;
      while (current.length > 75) {
        folded.push(current.substring(0, 75));
        current = ' ' + current.substring(75); // Add space for continuation
      }
      folded.push(current);
      return folded.join('\r\n');
    };

    const events = tasks.map((task, i) => {
      const day = String((task.weekNum - 1) * 7 + 1).padStart(2, '0');
      const eventDate = `${year}${monthToNum[months[task.monthNum - 1]]}${day}`;
      return `BEGIN:VEVENT\r\nUID:${Date.now()}-${i}@gardenplanner\r\nDTSTAMP:${now}\r\nSUMMARY:${foldLine(task.summary)}\r\nDESCRIPTION:${foldLine(task.description)}\r\nDTSTART;VALUE=DATE:${eventDate}\r\nDTEND;VALUE=DATE:${eventDate}\r\nEND:VEVENT`;
    });

    const icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//xAI//GardenPlanner//EN\r\nCALSCALE:GREGORIAN\r\n${events.join('\r\n')}\r\nEND:VCALENDAR\r\n`;

    console.log('ICS content:', icsContent);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.getElementById('downloadLink');
    if (!link) throw new Error('downloadLink element not found!');
    link.href = url;
    link.download = 'garden_calendar.ics';
    link.style.display = 'block';
    link.textContent = translations[currentLanguage].downloadCalendar || 'Download Calendar';
    console.log('Download link set:', link.href);
  } catch (error) {
    console.error('Error in generateICS:', error);
    alert('Failed to generate calendar: ' + error.message);
  }
}