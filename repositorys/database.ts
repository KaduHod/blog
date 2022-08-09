
const { MongoClient } = require('mongodb')

export default class MongoCluster{
  url = "mongodb+srv://gym-cloud:tnTTWKg7Qw48STg@gym-cloud.tnp2iq6.mongodb.net/?retryWrites=true&w=majority";
  client;
  db;

  constructor(){
    this.client = new MongoClient(this.url)
    this.db = this.client.db('sample_restaurants')
  }

  teste = async ()=>{
    const data = await this.db.collection('restaurants').findOne({name:"Kosher Island"})
    console.log(data)
  }

}


const cliente = new MongoCluster()
      cliente.teste()

