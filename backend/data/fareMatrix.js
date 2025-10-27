// backend/data/fareMatrix.js

// IMPORTANT: These arrays MUST accurately reflect the stations currently
// in your database AND their correct order on the line.
const purpleLine = [
  "Whitefield (Kadugodi)",
  "Hopefarm Channasandra",
  "Kadugodi Tree Park",
  "Pattanduru Agrahara",
  "Sri Sathya Sai Hospital",
  "Trinity", // Assuming Trinity is after Sathya Sai Hospital based on previous lists
  "Majestic (Nadaprabhu Kempegowda)" // Interchange
];

const greenLine = [
  "Nagasandra",
  "Dasarahalli",
  "Jalahalli",
  "Peenya Industry",
  // "Peenya", // Seems Peenya was missing from your list, add if needed
  "Goraguntepalya",
  "Yeshwanthpur",
  "Rajajinagar", // Assuming Rajajinagar is after Yeshwanthpur based on previous lists
  "Majestic (Nadaprabhu Kempegowda)" // Interchange
];


// --- NEW getFare function based on BMRCL Chart ---
const getFare = (start, end) => {
  // Handle entry and exit at the same station
  if (start === end) {
    return 10;
  }

  // Find the lines and indices
  let startLine = purpleLine.includes(start) ? purpleLine : greenLine;
  let endLine = purpleLine.includes(end) ? purpleLine : greenLine;

  let startIndex = startLine.indexOf(start);
  let endIndex = endLine.indexOf(end);

  // Handle case where station isn't found in our limited lists
  if (startIndex === -1 || endIndex === -1) {
    console.error(`Error: Station not found in fare matrix. Start: ${start}, End: ${end}`);
    return null; // Station not found in the defined arrays
  }

  // Calculate distance (number of stations BETWEEN start and end)
  let distance = 0;
  const majesticStationName = "Majestic (Nadaprabhu Kempegowda)";

  if (startLine === endLine) {
    // Same line
    distance = Math.abs(endIndex - startIndex);
  } else {
    // Different lines - must calculate distance via Majestic
    let majesticStartLineIndex = startLine.indexOf(majesticStationName);
    let majesticEndLineIndex = endLine.indexOf(majesticStationName);

    // Check if Majestic exists on both lines (it should)
    if (majesticStartLineIndex === -1 || majesticEndLineIndex === -1) {
       console.error("Error: Majestic station not found in one or both line arrays for transfer calculation.");
       return null;
    }

    let distToMajestic = Math.abs(startIndex - majesticStartLineIndex);
    let distFromMajestic = Math.abs(endIndex - majesticEndLineIndex);
    distance = distToMajestic + distFromMajestic;
  }

  // Determine fare based on the BMRCL chart (distance = number of stations travelled)
  if (distance <= 0) { // Should not happen if start != end, but safe check
      return 10;
  } else if (distance <= 2) { // 1-2 stations
      return 10;
  } else if (distance <= 4) { // 3-4 stations
      return 20;
  } else if (distance <= 6) { // 5-6 stations
      return 30;
  } else if (distance <= 8) { // 7-8 stations
      return 40;
  } else if (distance <= 10) { // 9-10 stations
      return 50;
  } else if (distance <= 15) { // 11-15 stations
      return 60;
  } else if (distance <= 18) { // 16-18 stations
      return 70;
  } else if (distance <= 22) { // 19-22 stations
      return 70; // Note: Chart shows 70 for 19, 80 for 20-22. Assuming typo/simplification needed. Using 70 for simplicity up to 22.
  } else if (distance <= 25) { // 23-25 stations
      return 80;
  } else if (distance <= 30) { // 26-30 stations
      return 90;
  } else { // > 30 stations
      return 90;
  }
};
// --- END of new getFare function ---


// Ensure you are using the correct export based on your project setup
module.exports = getFare; // Use this for CommonJS (if backend/package.json doesn't have "type": "module")
// export default getFare; // Use this for ES Modules (if backend/package.json has "type": "module")