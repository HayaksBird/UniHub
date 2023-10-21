package online.unihub.backend.app.service;

import org.springframework.stereotype.Service;

/**
 * Uses Levenshtein Distance
 */
@Service
public class StringSimilarityService {
    private final int minOperationCount = 4;


    public boolean areSimilar(String word1, String word2) {
        int[][] matrix = new int[word2.length()][word1.length()];

        //set the initial point
        if (word1.charAt(0) != word2.charAt(0)) matrix[0][0] = 1;
        //set the borders
        setBorders(word1, word2, matrix);
        //set the guts
        return calcInside(word1, word2, matrix);
    }


    private boolean calcInside(String word1, String word2, int[][] matrix) {
        int left, top, diagonal, min, minForRow;
        byte flag;

        for (int k = 1; k < word2.length(); k++) {
            minForRow = left = matrix[k][0];

            for (int i = 1; i < word1.length(); i++) {
                left = matrix[k][i - 1];
                top = matrix[k - 1][i];
                diagonal = matrix[k - 1][i - 1];

                if (left < minForRow) minForRow = left;
                min = Math.min(Math.min(left, top), diagonal);

                if (word1.charAt(i) == word2.charAt(k)) flag = 0;
                else flag = 1;

                matrix[k][i] = min + flag;
            }

            if (minForRow > minOperationCount) return false;
        }

        return true;
    }


    /**
     * Seth the borders for the operation
     */
    private void setBorders(String word1, String word2, int[][] matrix) {
        byte flag;

        for (int i = 1; i < word1.length(); i++) {
            if (word1.charAt(i) != word2.charAt(0))
                flag = 1;
            else
                flag = 0;

            matrix[0][i] = matrix[0][i - 1] + flag;
        }

        for (int i = 1; i < word2.length(); i++) {
            if (word2.charAt(i) != word1.charAt(0))
                flag = 1;
            else
                flag = 0;

            matrix[i][0] = matrix[i - 1][0] + flag;
        }
    }
}