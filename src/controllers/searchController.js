const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;

  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + (str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1),
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[m][n];
}

const searchProfessors = (professors, searchTerm, threshold) => {
  const results = [];

  for (const professor of professors) {
    const fullName = professor.username;
    const distance = levenshteinDistance(fullName.toLowerCase(), searchTerm.toLowerCase());

    if (distance <= threshold) {
      results.push(professor);
    }
  }

  return results;
}

module.exports = searchProfessors
