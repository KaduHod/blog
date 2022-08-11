import { MongoClient } from 'mongodb'
class MongoDB{
  public url = "mongodb+srv://gym-cloud:tnTTWKg7Qw48STg@gym-cloud.tnp2iq6.mongodb.net/?retryWrites=true&w=majority";
  public client;
  public database;
  public collection;
  public databaseName:string;
  public collectionName:string;
  public connectionOn = false;

  constructor(){
    this.client = new MongoClient(this.url);
    this.databaseName = 'gym';
    this.database = this.client.db('gym');
  }

  public connect = async () => {
    try {
      this.client.connect()
      console.log('\n\t\t  <======= Connected to Mongo Cloud! =======>\n')
    } catch (error) {
      console.log('\t Error:'+error)
    }
  }

  public disconnect = () => {
    try {
      this.client.close()
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
      this.collection = this.database.collection(collection)

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
        },
        deleteMany: ({collection, filters}) => {
          const cursor = collection.deleteMany(filters)
          return new Promise(resolve => resolve(cursor.deletedCount ))
        },
        delete: ({collection, filters}) => {
          const cursor = collection.deleteMany(filters)
          return new Promise(resolve => resolve(cursor.deletedCount))
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
}

const db = new MongoDB()
      db.connect()

export default db
