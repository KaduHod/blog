//const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'

export default class MongoDB{
  public url = "mongodb+srv://gym-cloud:tnTTWKg7Qw48STg@gym-cloud.tnp2iq6.mongodb.net/?retryWrites=true&w=majority";
  public client;
  public db
  public collection
  public collectionName;

  constructor(){
    this.client = new MongoClient(this.url)
    this.db = this.client.db('gym')

  }

  public connect = async () => {
    try {
      this.client.connect()
      console.log('\n\t\t  <======= Connected! =======>\n')
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

  public setCollection = coll => {
    this.collection = this.db.collection(coll)
    this.collectionName = coll
  }

  public query = async args => {
    this.connect()
    this.setCollection(args.collection)
    const queryHandler = {
      insert: async (opt:Object) => {
        const {client, args} = opt
        const {collectionName} = client
        console.log({client,collectionName, args})

        return 1
      },
      insertMany: (args:Object) => {
        console.log(args)
        return 1
      },
      find: (args:Object) => {
        console.log(args)
        return 1
      },
      findMany: args => {
        return 1
      },
      update: args => {
        return 1
      },
      updateMany: args => {
        return 1
      },
      delete: args => {
        return 1
      },
      deleteMany: args => {
        return 1
      }
    }
    const result = await queryHandler[args.type]({client: this, args})
    this.disconnect()
    return result
  }

  // createDatabase = async dbName => {
    // this.setDatabase(dbName)
  // }

  // setDatabase = db => {
    // this.db = this.client.db(db)
    // this.dbName = db
  // }
}
