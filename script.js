import { plantData } from './plantData.js';

const translations = {
  en: {
    title: "Garden Planner",
    growingZone: "Growing Zone:",
    selectZone: "Select Zone",
    measurementUnit: "Measurement Unit:",
    gardenBeds: "Garden Beds",
    bedName: "Bed Name:",
    dimensions: "Dimensions",
    crop: "Crop:",
    addBed: "Add Another Bed",
    planGarden: "Plan My Garden",
    tasks: "Tasks:",
    downloadCalendar: "Download Your Garden Calendar",
    start: "Start",
    transplant: "Transplant",
    sow: "Sow",
    harvest: "Harvest"
  },
  es: {
    title: "Planificador de Jardín",
    growingZone: "Zona de Crecimiento:",
    selectZone: "Seleccionar Zona",
    measurementUnit: "Unidad de Medida:",
    gardenBeds: "Camas de Jardín",
    bedName: "Nombre de la Cama:",
    dimensions: "Dimensiones",
    crop: "Cultivo:",
    addBed: "Agregar Otra Cama",
    planGarden: "Planificar Mi Jardín",
    tasks: "Tareas:",
    downloadCalendar: "Descargar Tu Calendario de Jardín",
    start: "Iniciar",
    transplant: "Trasplantar",
    sow: "Sembrar",
    harvest: "Cosechar"
  },
  ja: {
    title: "ガーデンプランナー",
    growingZone: "栽培ゾーン：",
    selectZone: "ゾーンを選択",
    measurementUnit: "測定単位：",
    gardenBeds: "ガーデンベッド",
    bedName: "ベッド名：",
    dimensions: "寸法",
    crop: "作物：",
    addBed: "別のベッドを追加",
    planGarden: "私の庭を計画",
    tasks: "タスク：",
    downloadCalendar: "ガーデンカレンダーをダウンロード",
    start: "開始",
    transplant: "移植",
    sow: "播種",
    harvest: "収穫"
  },
  zh: {
    title: "花园规划器",
    growingZone: "生长区：",
    selectZone: "选择区域",
    measurementUnit: "测量单位：",
    gardenBeds: "花园床",
    bedName: "床名：",
    dimensions: "尺寸",
    crop: "作物：",
    addBed: "添加另一个床",
    planGarden: "规划我的花园",
    tasks: "任务：",
    downloadCalendar: "下载你的花园日历",
    start: "开始",
    transplant: "移植",
    sow: "播种",
    harvest: "收获"
  }
};

let currentLanguage = 'en';
let bedCount = 1;

function updateTranslations() {
  console.log('Updating translations for language:', currentLanguage);
  try {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      console.log(`Translating ${key} to:`, translations[currentLanguage][key]);
      element.textContent = translations[currentLanguage][key] || element.textContent;
      if (key === 'dimensions') {
        const unit = document.getElementById('unit').value;
        element.innerHTML = `${translations[currentLanguage][key]} (<span class="unit-label">${unit}</span>)`;
      }
    });
  } catch (error) {
    console.error('Error in updateTranslations:', error);
  }
}

function changeLanguage() {
  console.log('Language change triggered');
  currentLanguage = document.getElementById('language').value;
  console.log('New language set to:', currentLanguage);
  updateTranslations();
  updateUnitLabels();
  populateCropDropdowns();
}

function populateCropDropdowns() {
  console.log('Starting populateCropDropdowns...');
  try {
    console.log('plantData available:', plantData);
    if (!plantData) {
      throw new Error('plantData is not loaded!');
    }
    const crops = Object.keys(plantData).sort();
    console.log('Crop names extracted (sorted):', crops);
    const defaultOption = `<option value="">${translations[currentLanguage].crop}</option>`;
    const options = defaultOption + crops.map(crop => `<option value="${crop}">${crop}</option>`).join('');
    console.log('Generated options HTML:', options);
    const dropdowns = document.querySelectorAll('.crop-select');
    console.log('Found dropdowns:', dropdowns.length, dropdowns);
    if (dropdowns.length === 0) {
      console.warn('No .crop-select elements found in DOM!');
    }
    dropdowns.forEach(select => {
      console.log('Updating dropdown:', select);
      select.innerHTML = options;
    });
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
    labels.forEach(label => {
      label.textContent = unit;
    });
    updateTranslations(); // Ensure dimensions label updates
  } catch (error) {
    console.error('Error in updateUnitLabels:', error);
  }
}

function addBed() {
  console.log('Adding new bed...');
  try {
    bedCount++;
    const container = document.getElementById('bedsContainer');
    if (!container) {
      throw new Error('bedsContainer not found!');
    }
    const unit = document.getElementById('unit').value;
    console.log('Current unit for new bed:', unit);
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
    console.log('New bed HTML created:', newBed);
    container.appendChild(newBed);
    console.log('Bed appended to container');
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
      addBedButton.addEventListener('click', () => {
        console.log('Button clicked!');
        addBed();
      });
    } else {
      console.error('Error: Add Bed button not found! Check if id="addBedButton" is in HTML.');
    }
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
      console.log('Language select found, attaching listener');
      languageSelect.addEventListener('change', changeLanguage);
    } else {
      console.error('Error: Language select not found!');
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

    const unitToSqFt = {
      'ft': 1,
      'in': 1 / 144,
      'cm': 1 / 929.03,
      'm': 10.7639
    };

    const sqFtToInches = 144;
    const sqFtToCm = 929.03;

    const beds = Array.from(document.querySelectorAll('.bed')).map((bed, index) => {
      const name = bed.querySelector('input[name="bedName"]').value;
      const length = parseFloat(bed.querySelector('input[name="length"]').value);
      const width = parseFloat(bed.querySelector('input[name="width"]').value);
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

    const seedlingBuffer = 1.2;

    let tasks = [];
    beds.forEach(bed => {
      if (bed.crop && plantData[bed.crop]) {
        const data = plantData[bed.crop];
        const plantsPerBed = Math.floor(bed.area / data.spacing);
        const plantsWithBuffer = data.startIndoors ? Math.ceil(plantsPerBed * seedlingBuffer) : plantsPerBed;
        const shift = zoneShift[zone];

        const isImperial = (unit === 'ft' || unit === 'in');
        const spacingUnit = isImperial ? 'in' : 'cm';
        const conversionFactor = isImperial ? sqFtToInches : sqFtToCm;
        const baseSpacing = Math.sqrt(data.spacing);
        const plantSpacing = Math.round(baseSpacing * Math.sqrt(conversionFactor) * 12 / 12);
        const rowSpacing = Math.round(baseSpacing * Math.sqrt(conversionFactor) * 18 / 12);
        const spacingInfo = `Row Spacing - ${rowSpacing} ${spacingUnit} between rows, ${plantSpacing} ${spacingUnit} between plants`;

        const adjustWeeks = (taskData) => {
          let { week, month } = taskData;
          let totalWeeks = (new Date(`${month} 1, ${new Date().getFullYear()}`).getMonth() * 4) + week + shift;
          while (totalWeeks < 1) totalWeeks += 48;
          while (totalWeeks > 48) totalWeeks -= 48;
          const newMonthNum = Math.floor((totalWeeks - 1) / 4);
          const newWeek = totalWeeks - (newMonthNum * 4);
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return `Week ${newWeek} of ${months[newMonthNum]}`;
        };

        if (data.startIndoors) 
          tasks.push(`${bed.id} - ${translations[currentLanguage].start} ${plantsWithBuffer} ${bed.crop} indoors: ${adjustWeeks(data.startIndoors)}`);
        if (data.transplant) 
          tasks.push(`${bed.id} - ${translations[currentLanguage].transplant} ${plantsPerBed} ${bed.crop}, ${spacingInfo}: ${adjustWeeks(data.transplant)}`);
        if (data.sow) 
          tasks.push(`${bed.id} - ${translations[currentLanguage].sow} ${plantsPerBed} ${bed.crop}, ${spacingInfo}: ${adjustWeeks(data.sow)}`);
        if (data.harvest) 
          tasks.push(`${bed.id} - ${translations[currentLanguage].harvest} ${bed.crop}: ${adjustWeeks(data.harvest)}`);
      }
    });

    console.log('Generated tasks:', tasks);
    document.getElementById('taskList').innerHTML = `<h2>${translations[currentLanguage].tasks}</h2><ul>` + 
      tasks.map(task => `<li>${task}</li>`).join('') + '</ul>';

    generateICS(tasks, zone);
  } catch (error) {
    console.error('Error in form submission:', error);
  }
});

function generateICS(tasks, zone) {
  console.log('Generating ICS file...');
  try {
    const monthToNum = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
      'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };

    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const events = tasks.map((task, i) => {
      const [fullDescription, timing] = task.split(': ');
      const hasSpacing = fullDescription.includes('Row Spacing');
      const [mainAction, spacingDetails] = hasSpacing ? fullDescription.split(', ') : [fullDescription, ''];
      const descriptionWithSpacing = spacingDetails ? `${spacingDetails}` : '';
      const [weekText, month] = timing.split(' of ');
      const weekNum = parseInt(weekText.split(' ')[1]);
      const monthNum = monthToNum[month];
      const year = new Date().getFullYear();
      const day = String((weekNum - 1) * 7 + 1).padStart(2, '0');
      const eventDate = `${year}${monthNum}${day}`;
      console.log(`Event ${i + 1}:`, { mainAction, descriptionWithSpacing, eventDate });
      return `BEGIN:VEVENT\r\nUID:${Date.now()}-${i}@gardenplanner\r\nDTSTAMP:${now}\r\nSUMMARY:${mainAction}\r\n${descriptionWithSpacing ? `DESCRIPTION:${descriptionWithSpacing}\r\n` : ''}DTSTART;VALUE=DATE:${eventDate}\r\nDTEND;VALUE=DATE:${eventDate}\r\nEND:VEVENT`;
    });

    const icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//xAI//GardenPlanner//EN\r\nCALSCALE:GREGORIAN\r\n${events.join('\r\n')}\r\nEND:VCALENDAR\r\n`;

    console.log('ICS content:', icsContent);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.getElementById('downloadLink');
    if (!link) {
      throw new Error('downloadLink element not found!');
    }
    link.href = url;
    link.download = 'garden_calendar.ics';
    link.style.display = 'block';
    link.textContent = translations[currentLanguage].downloadCalendar;
    console.log('Download link set:', link.href);
  } catch (error) {
    console.error('Error in generateICS:', error);
  }
}
