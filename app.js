const reversal = require('./simplereversalsort')
const breakpoint = require('./improvedbreakpointreversalsort')
const express = require('express')
const fs = require('fs')
const upload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000

var permutation = []

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`))

app.get('/', (req, res) => res.redirect("/improvedbreakpointreversalsort.html")) //Getting HTML from file

app.get('/improvedbreakpointreversalsort.html', (req, res) => res.sendFile(__dirname + "/improvedbreakpointreversalsort.html")) //Getting HTML from file

app.get('/simplereversalsort.html', (req, res) => res.sendFile(__dirname + "/simplereversalsort.html")) //Getting HTML from file

app.post('/improvedbreakpointreversalsort.html', function (req, res) { //When posting from this route, from the form
    handleRequest("ImprovedBreakpoint", req, res);
})

app.post('/simplereversalsort.html', function (req, res) { //When posting from this route, from the form
    handleRequest("SimpleReversal", req, res);
})

function handleRequest(type, req, res) {
    var filename = req.files.file.name //Uploaded filename
    var path = './files/' + filename //Move file to local server path

    req.files.file.mv(path, function (err) { //Moving file to specified local path
        if (err)
            res.send(err)
        else {
            try {
                readDNA(path) //if successfully completed start reading file
            } catch (e) {
                console.error(e)
            }
            const file = `${__dirname}/filesWrite.txt`;
            if (type == "SimpleReversal") {
                reversal.main(permutation, res)
            } else {
                breakpoint.main(permutation, res)
            }
        }
    })
}

function readDNA(path) {

    var contents = fs.readFileSync(path, 'utf8') //Opening file 

    permutation = contents.split("\r\n") //Converting to array

    fs.writeFileSync("./filesWrite.txt",
        ""
    );
}