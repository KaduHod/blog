//const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'
export default class MongoDB{
  public url = "mongodb+srv://gym-cloud:tnTTWKg7Qw48STg@gym-cloud.tnp2iq6.mongodb.net/?retryWrites=true&w=majority";
  public client;
  public db;
  public collection;
  public dbName:string;
  public collectionName:string;
  public connectionOn = false;

  constructor(){
    this.client = new MongoClient(this.url);
    this.dbName = 'gym';
    this.db = this.client.db('gym');
    this.connectionOn = false;
  }

  public connect = async () => {
    try {
      this.client.connect()
      this.connectionOn = true
      console.log('\n\t\t  <======= Connected! =======>\n')
    } catch (error) {
      console.log('\t Error:'+error)
    }
  }

  public disconnect = () => {
    try {
      this.client.close()
      this.connectionOn = false
      console.log('\n\t\t<======= Disconnected! =======>\n')
    } catch (error) {
      console.log('\t Error:'+error)
    }
  }

  /**
   * @param args {
   *  type: tipo de operação no banco
   *  collection: tabela a ser manipulada
   *  data: dados para query
   * }
   * @returns
   */
  public query = async args => {
    try {
      if(!this.connectionOn) this.client.connect()
      const {type, collection, data, filters, select} = args
      this.collection = this.db.collection(collection)

      const queryHandler = {
        insertOne: async ({collection, data}) => {
          const query = await collection.insertOne(data)
          return query.insertedCount
        },
        insertMany: async ({collection, data}) => {
          const query = await collection.insertMany(data)
          return query.insertedCount
        },
        findOne: async ({collection, filters, select}) => {
          return await collection.findOne(filters, select)
        },
        find: ({collection, filters, select}) => {
          const cursor = collection.find(filters, select)
          return new Promise(resolve => resolve(cursor.toArray()))
        }
      }

      const queryResult = await queryHandler[type]( {
        collection: this.collection,
        data,
        filters,
        select
      })
      return queryResult


    } catch (error) {
      console.log('\tError', error)
      return error
    }
  }

  // createDatabase = async dbName => {
    // this.setDatabase(dbName)
  // }

  // setDatabase = db => {
    // this.db = this.client.db(db)
    // this.dbName = db
  // }
}
