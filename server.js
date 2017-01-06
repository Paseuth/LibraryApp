let express = require('express');
let app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.get('/', (request, response)=>{
    response.render('../index.html');
})

app.listen(8082)