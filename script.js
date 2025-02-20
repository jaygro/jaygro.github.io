import { plantData } from './plantData.js';

let bedCount = 1;

function populateCropDropdowns() {
  console.log('Starting populateCropDropdowns...');
  try {
    console.log('plantData available:', plantData);
    if (!plantData) {
      throw new Error('plantData is not loaded!');
    }
    const crops = Object.keys(plantData).sort(); // Sort alphabetically
    console.log('Crop names extracted (sorted):', crops);
    const defaultOption = '<option value="">Select a crop (optional)</option>';
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
      <label>Bed Name:</label><br>
      <input type="text" name="bedName" placeholder="e.g., Backyard Bed ${bedCount}" required><br>
      <label>Dimensions (<span class="unit-label">${unit}</span>):</label><br>
      <input type="number" name="length" placeholder="Length" required> x 
      <input type="number" name="width" placeholder="Width" required><br>
      <label>Crop 1:</label><br>
      <select name="crop1" class="crop-select"></select><br>
      <label>Crop 2:</label><br>
      <select name="crop2" class="crop-select"></select><br>
      <label>Crop 3:</label><br>
      <select name="crop3" class="crop-select"></select><br>
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
    const addBedButton = document.getElementById('addBedButton');
    if (addBedButton) {
      console.log('Add Bed button found, attaching listener');
      addBedButton.addEventListener('click', () => {
        console.log('Button clicked!'); // Confirm click
        addBed();
      });
    } else {
      console.error('Error: Add Bed button not found! Check if id="addBedButton" is in HTML.');
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

    const sqFtToUnit = {
      'ft': 1,
      'in': 144,
      'cm': 929.03,
      'm': 0.092903
    };

    const unitLabel = {
      'ft': 'ft',
      'in': 'in',
      'cm': 'cm',
      'm': 'm'
    };

    const beds = Array.from(document.querySelectorAll('.bed')).map((bed, index) => {
      const name = bed.querySelector('input[name="bedName"]').value;
      const length = parseFloat(bed.querySelector('input[name="length"]').value);
      const width = parseFloat(bed.querySelector('input[name="width"]').value);
      const area = (length * width) * unitToSqFt[unit];
      const crops = [
        bed.querySelector('select[name="crop1"]').value,
        bed.querySelector('select[name="crop2"]').value,
        bed.querySelector('select[name="crop3"]').value
      ].filter(crop => crop);
      console.log(`Bed ${index + 1}:`, { name, length, width, area, crops });
      return { id: name || `Bed ${index + 1}`, length, width, area, crops };
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
      bed.crops.forEach(crop => {
        if (plantData[crop]) {
          const data = plantData[crop];
          const plantsPerBed = Math.floor(bed.area / data.spacing);
          const plantsWithBuffer = data.startIndoors ? Math.ceil(plantsPerBed * seedlingBuffer) : plantsPerBed;
          const shift = zoneShift[zone];

          const spacingInUnit = (data.spacing * sqFtToUnit[unit]).toFixed(2);
          const baseSpacing = Math.sqrt(data.spacing);
          const plantSpacing = (baseSpacing * 12 * Math.sqrt(sqFtToUnit[unit] / 144)).toFixed(1);
          const rowSpacing = (baseSpacing * 18 * Math.sqrt(sqFtToUnit[unit] / 144)).toFixed(1);
          const spacingInfo = `(${spacingInUnit} sq ${unitLabel[unit]}, ${plantSpacing} ${unitLabel[unit]} between plants, ${rowSpacing} ${unitLabel[unit]} between rows)`;

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
            tasks.push(`${bed.id} - Start ${plantsWithBuffer} ${crop} indoors ${spacingInfo}: ${adjustWeeks(data.startIndoors)}`);
          if (data.transplant) 
            tasks.push(`${bed.id} - Transplant ${plantsPerBed} ${crop} ${spacingInfo}: ${adjustWeeks(data.transplant)}`);
          if (data.sow) 
            tasks.push(`${bed.id} - Sow ${plantsPerBed} ${crop} ${spacingInfo}: ${adjustWeeks(data.sow)}`);
          if (data.harvest) 
            tasks.push(`${bed.id} - Harvest ${crop} ${spacingInfo}: ${adjustWeeks(data.harvest)}`);
        }
      });
    });

    console.log('Generated tasks:', tasks);
    document.getElementById('taskList').innerHTML = '<h2>Tasks:</h2><ul>' + 
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

    // Get current UTC timestamp for DTSTAMP (still needed, but not tied to event time)
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const events = tasks.map((task, i) => {
      const [fullDescription, timing] = task.split(': ');
      const [mainAction, spacingDetails] = fullDescription.split(' (');
      const descriptionWithSpacing = spacingDetails ? ` (${spacingDetails}` : '';
      const [weekText, month] = timing.split(' of ');
      const weekNum = parseInt(weekText.split(' ')[1]);
      const monthNum = monthToNum[month];
      const year = new Date().getFullYear();
      const day = String((weekNum - 1) * 7 + 1).padStart(2, '0');
      const eventDate = `${year}${monthNum}${day}`; // No time for all-day event
      console.log(`Event ${i + 1}:`, { mainAction, descriptionWithSpacing, eventDate });
      return `BEGIN:VEVENT\r\nUID:${Date.now()}-${i}@gardenplanner\r\nDTSTAMP:${now}\r\nSUMMARY:${mainAction}\r\nDESCRIPTION:${descriptionWithSpacing}\r\nDTSTART;VALUE=DATE:${eventDate}\r\nDTEND;VALUE=DATE:${eventDate}\r\nEND:VEVENT`;
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
    link.textContent = 'Download Your Garden Calendar';
    console.log('Download link set:', link.href);
  } catch (error) {
    console.error('Error in generateICS:', error);
  }
}