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
        

        function reversal(i, j) { //Takes in both indexes
            j = j + 1
            distance = j - i //Calculates distance between them
            reversed = permutation.splice(i - 1, distance) //Splits all number in that interval
            reversed.reverse() //Reverses them
            permutation.splice(i - 1, 0, reversed) //Puts inverted back in the array
            permutation = [].concat(...permutation) //Flattens the array
            reversed = []
            p = p + 1
        }
    }
}