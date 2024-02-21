const http = require ('http') ; 
const app = require ('./app') ; 
const mongoose = require ('mongoose'); 

//connexion a la base de donnee :  
const url= "mongodb+srv://lina:11915562@cluster0.b5scah6.mongodb.net/medAppDataBase?retryWrites=true&w=majority"
async function connect () {
    try {
        await mongoose.connect(url)
        console.log('Connexion à la base de données réussie !');
    }
    catch (error) {
        console.error(error);
    }
}
connect()

// Démarrage du serveur
app.set('port', process.env.port || 3000)
const server = http.createServer (app);
server.listen(process.env.port || 3000 , () => console.log ("serveur en marche "));


//mongodb+srv://lina:<password>@cluster0.b5scah6.mongodb.net/?retryWrites=true&w=majority


