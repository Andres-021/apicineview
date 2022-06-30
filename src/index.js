const app = require('./app_routes');

const main = async() =>{
    app.listen(5000);
    console.log('Server UP! in http://localhost:5000')
}

main()