export function Compare( word, guess ) {
    function letterCountsOf( word ) {
        const letterCounts = {};
        word.toUpperCase().split('').forEach( letter => { letterCounts[letter] = letterCounts[letter] + 1 || 1;
        });
        return letterCounts;
    }
    const wordUpper = word.toUpperCase();
    const wordCounts = letterCountsOf(wordUpper); 
    const guessCounts = letterCountsOf(guess); 
    let matched = 0;
    for( let letter in guessCounts ){
        const wordCount = wordCounts[letter] || 0;
        const guessCount = guessCounts[letter] || 0; 
        matched += Math.min( wordCount, guessCount );
    }
    return matched;
}

