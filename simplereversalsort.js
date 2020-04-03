var fs = require('fs');

module.exports = {
    main: function (array, res) {
        var permutation = array.map(Number);
        var reversed = []
        var j, p = 0
        
        for (let i = 1; i < permutation.length; i++) {
            j = permutation.indexOf(i) + 1

            if (j != i) {
                reversal(i, j)
            }
        }

        fs.appendFileSync("./filesWrite.txt",
            "----------------------------- Simple Reversal Sort ----------------------------- \n" +
            "Number of reversals: " + p + "\n" +
            "Identity permutation: " + permutation + "\n"
        );
        res.download(`${__dirname}/filesWrite.txt`); // Set disposition and send it.
        

        function reversal(i, j) {
            j = j + 1
            distance = j - i
            reversed = permutation.splice(i - 1, distance)
            reversed.reverse()
            permutation.splice(i - 1, 0, reversed)
            permutation = [].concat(...permutation)
            reversed = []
            p = p + 1
        }
    }
}