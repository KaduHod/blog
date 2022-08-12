import { Document, MongoClient } from 'mongodb'
class MongoDB{
  public url = "mongodb+srv://gym-cloud:tnTTWKg7Qw48STg@gym-cloud.tnp2iq6.mongodb.net/?retryWrites=true&w=majority";
  public client;
  public database;
  public collection;
  public collectionName:string;

  constructor(){
    this.client = new MongoClient(this.url);
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
   *  the rest depends of whats type of query you want
   * }
   * @returns
   */
  public query = async (args) => {
    try {
      const { type, collection,
              data, filters,
              select, pipeline,
              set } = args

      this.collection = this.database.collection(collection)
      const queryHandler = {
        insertOne: ({collection, data}):Promise<Object> => {
          const query = collection.insertOne(data)
          return new Promise(resolve => resolve( query ))
        },
        insertMany: ({collection, data}):Promise<Number> => {
          const query = collection.insertMany(data)
          return new Promise(resolve => resolve( query.insertedCount ))
        },
        findOne: ({collection, filters, select}):Promise<Document> => {
          const query = collection.findOne(filters, select)
          return new Promise(resolve => resolve( query ))
        },
        find: ({collection, filters, select}):Promise<Document[]> => {
          const cursor = collection.find(filters, select)
          return new Promise(resolve => resolve( cursor.toArray() ))
        },
        deleteMany: ({collection, filters}):Promise<Number> => {
          const cursor = collection.deleteMany(filters)
          return new Promise(resolve => resolve( cursor.deletedCount ))
        },
        delete: ({collection, filters}):Promise<Number> => {
          const cursor = collection.deleteMany(filters)
          return new Promise(resolve => resolve( cursor.deletedCount))
        },
        aggregation: ({collection, pipeline}):Promise<Document[]> => {
          const [ match, lookup ] = pipeline
          const cursor = collection.aggregate([ match, lookup ])
          return new Promise(resolve => resolve(cursor.toArray()))
        },
        updateOne: ({collection, filters, set}):Promise<Number> => {
          const query = collection.updateOne(filters, set)
          return new Promise(resolve => resolve(query.matchedCount))
        },
        updateMany: ({collection, filters, set}):Promise<Number> => {
          const query = collection.updateMany(filters, set)
          return new Promise(resolve => resolve(query.matchedCount))
        }
      }

      return await queryHandler[type]({
        collection: this.collection,
        data, filters, select, pipeline, set
      })

    } catch (error) {
      console.log('\tError', error)
      return error
    }
  }
}

const db = new MongoDB()
      db.connect()

export default db
