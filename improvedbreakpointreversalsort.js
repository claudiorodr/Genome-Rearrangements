var fs = require('fs');

module.exports = {
    main: function (array, res) {
        // var permutation = array.map(Number);
        var permutation = [0, 13, 2, 17, 1, 3, 20, 19, 11, 12, 4, 5, 16, 15, 10, 18, 14, 8, 7, 6, 9, 21]
        var smallest = permutation.length
        var reversed = []
        var breakNum

        findBreakPoint()
        while (breakNum > 0) {
            findBreakPoint()
            if (smallest != permutation.length) {
                i = permutation.indexOf(smallest)
                j = permutation.indexOf(smallest - 1)

                smallest = permutation.length

                if (i < j) {
                    reversal(i, j)
                } else {
                    reversal(j, i)
                }
            } else {
                console.log('hi ');
                
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

        function reversal(left, right) {
            distance = right - left
            reversed = permutation.splice(left + 1, distance)
            reversed.reverse()
            permutation.splice(left + 1, 0, reversed)
            permutation = [].concat(...permutation)
            reversed = []
            console.log(permutation);
        }
    }
}