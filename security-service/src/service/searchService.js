// Function to calculate the Levenshtein distance between two strings
// We need it for the "smart search" in our application
const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;

  const dp = [];

  // Initialize a 2D array for dynamic programming
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j; // Initialize the first row
      else if (j === 0) dp[i][j] = i; // Initialize the first column
      else {
        // Calculate the minimum of three possible operations (insert, delete, or replace)
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + (str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1), // Match or mismatch
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1 // Insertion
        );
      }
    }
  }

  return dp[m][n]; // Return the Levenshtein distance
}

// Function to search for professors based on a search term and a distance threshold
const searchProfessors = (professors, searchTerm, threshold) => {
  const results = [];

  for (const professor of professors) {
    const fullName = professor.username;
    const distance = levenshteinDistance(fullName.toLowerCase(), searchTerm.toLowerCase());

    if (distance <= threshold) {
      results.push(professor); // If the distance is below or equal to the threshold, add the professor to the results
    }
  }

  return results; // Return the filtered list of professors
}

// Export the searchProfessors function for use in the application
module.exports = searchProfessors;
