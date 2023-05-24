let express = require('express');
const path = require('path');
let app = express();
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
const { multer, upload } = require('./models/Storage');

var msg = ''

app.get('/', (req, res) => {
    const img = '/img/house.svg';
    const links = [{ href: 'http://localhost:3000/', text: '| HOME' }, { href: 'http://localhost:3000/consultas', text: '| CONSULTAS' }]
    res.render('index', {
        links: links,
        img: img,
        results: msg
    }
    )
    res.end()
});

app.post('/', function (req, res, next) {

    upload(req, res, function (err) {
        // FILE SIZE ERROR
        if (err instanceof multer.MulterError) {
            console.error(err)
            msg = "Max file size 2MB allowed!";
            res.redirect('/')
        }
        // INVALID FILE TYPE, message will return from fileFilter callback
        else if (err) {
            msg = err.message;
            console.error(err.message);
            res.redirect('/')
        }
        // FILE NOT SELECTED
        else if (!req.file) {
            msg = "File is required!";
            console.error("File is required!");
            res.redirect('/');
        }
        // SUCCESS
        else {
            msg = 'File Size: ' + req.file.size / 1000 + ' kb' + '   -     ' + 'File Status: ' + "File uploaded successfully!";
            console.log(req.file.size / 1000 + ' kb' + "  File uploaded successfully!");
            console.log("File response", req.file);
            res.redirect('/')
        }
    })

    //  res.redirect('/')


})
app.listen(4000, () => console.log('Example app listening on port 4000!'));



