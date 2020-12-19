let express = require('express');
let app = express();
let path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/css/main.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/css/main.css'));
});
app.get('/js/three.module.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/three.module.js'));
});
app.get('/js/OrbitControls.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/OrbitControls.js'));
});
app.get('/js/main.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/main.js'));
});
app.get('/triangulate', function(req, res) {
    let length = req.query.length / 2;
    let width  = req.query.width  / 2;
    let height = req.query.height;

    const verts = [
        {x: -width, y: 0, z: +length},
        {x: +width, y: 0, z: +length},
        {x: -width, y: +height, z: +length},
        {x: +width, y: +height, z:  +length},
        {x: -width, y: 0, z: -length},
        {x: +width, y: 0, z: -length},
        {x: -width, y: +height, z: -length},
        {x: +width, y: +height, z: -length}
    ];

    res.contentType('json');
    res.send(JSON.stringify(verts));
});

app.listen(8080);