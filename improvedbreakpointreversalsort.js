var fs = require('fs');

module.exports = {
    main: function (array, res) {
        var permutation = array.map(Number); //Input file
        permutation.unshift(0)
        permutation.push(permutation.length)
        console.log(permutation);

        // var permutation = [0, 13, 2, 17, 1, 3, 20, 19, 11, 12, 4, 5, 16, 15, 10, 18, 14, 8, 7, 6, 9, 21]
        var smallest = permutation.length //smallest var starts with value of maximum number
        var reversed, increasing = []
        var breakNum //Number of breakpoints
        var p = 0 //Number of breakpoints

        findBreakPoint() //Function that gives number of breakpoints and smallest number in decreasing sequence to enter in while loop
        while (breakNum > 0) { //While number of breakpoints is higher than zero
            findBreakPoint() //Call function each cycle for number of breakpoints
            if (smallest != permutation.length) { //if smallest number is still equal to maximum number, it mens that there was no decreasing sequence
                i = permutation.indexOf(smallest) //We take the index of smallest number in a decreasing sequence
                j = permutation.indexOf(smallest - 1) //We take the index of the number before that (smallest - 1)

                smallest = permutation.length //Reset value os smallest vr for next cycle

                if (i < j) { //Depending on the order of both numbers we reverse them
                    reversal(i, j)
                } else {
                    reversal(j, i)
                }
            } else if (breakNum > 0) { //In the case that there's no decreasing sequence
                findIncreasing(0) //Gets an increasing sequence
                if (increasing.includes(0)) {
                    num = increasing[increasing.length - 1]
                    increasing = []
                    findIncreasing(num)
                }
                first = permutation.indexOf(increasing[0])
                last = permutation.indexOf(increasing[increasing.length - 1])
                reverseIncreased(first, last) //revert the sequence
                increasing = []
            }
        }

        fs.appendFileSync("./filesWrite.txt",
            "----------------------------- Simple Reversal Sort ----------------------------- \n" +
            "Number of reversals: " + p + "\n" +
            "Identity permutation: " + permutation + "\n"
        );
        res.download(`${__dirname}/filesWrite.txt`); // Set disposition and send it.

        function findIncreasing(init) {
            for (let i = init; i < permutation.length - 1; i++) {
                if (permutation[i] - permutation[i + 1] == -1) { //If it's an increasing sequence
                    increasing.push(permutation[i], permutation[i + 1]) //Saves to an array the numbers of the sequence
                } else if (increasing.length != 0) { //If the array is filled exit loop
                    break
                }
            }
        }

        function findBreakPoint() {
            breakNum = 0
            for (let i = 0; i < permutation.length - 1; i++) {
                if (permutation[i] - permutation[i + 1] == 1 && smallest > permutation[i + 1]) {
                    smallest = permutation[i + 1]
                } else if (Math.abs(permutation[i] - permutation[i + 1]) != 1) {
                    breakNum = breakNum + 1
                }
            }
        }

        function reversal(left, right) { //Takes in both indexes
            distance = right - left //Calculates distance between them
            reversed = permutation.splice(left + 1, distance) //Splits all number in that interval
            reversed.reverse() //Reverses them
            permutation.splice(left + 1, 0, reversed) //Puts inverted back in the array
            permutation = [].concat(...permutation) //Flattens the array
            reversed = []
            console.log(permutation);
            p = p + 1
        }

        function reverseIncreased(left, right) { //Especial case for Reverting Increasing sequences
            distance = right - left + 1
            reversed = permutation.splice(left, distance)
            reversed.reverse()
            permutation.splice(left, 0, reversed)
            permutation = [].concat(...permutation)
            reversed
            console.log(permutation);
            p = p + 1
        }
    }
}