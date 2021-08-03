let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');


let app = express();

app.engine('handlebars', exphbs({ defaultLayout: './main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false

}));
// parse application/json
app.use(bodyParser.json())


const settingsBill = SettingsBill();
app.get('/', function(req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
    });
});


app.post('/settings', function(req, res) {

    settingsBill.setSettings({
            callCost: req.body.callCost,
            smsCost: req.body.smsCost,
            warningLevel: req.body.warningLevel,
            criticalLevel: req.body.criticalLevel
        })
        // console.log(settingsBill.getSettings());

    res.redirect('/')
});
app.post('/action', function(req, res) {

    settingsBill.recordAction(req.body.actionType);
    res.redirect('/')
});

app.get('/actions', function(req, res) {
    res.render('actions', { actions: settingsBill.actions() });
});
app.get('/actions/:actionType', function(req, res) {
    const actionType = req.params.actionType;

    res.render('actions', { actions: settingsBill.actionsFor(actionType) });
});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});






// app.get('/settings/:costType', function() {
//     let costType = req.params.costType;

//     let cost = 0;
//     //lookup cost for costType
//     if (costType === 'sms') {
//         cost = settings.smsCost;
//     } else if (costType === 'call') {
//         cost = settings.callCost;
//     }

//     req.render('cost', {
//         costType,
//         cost
//     });
// });