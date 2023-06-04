import { Db, Collection, ObjectId, WithId } from "mongodb";

export interface IUserRecord {
  firstName: string;
  lastName: string;
}
export default class CustomerRepository {
  private collection: Collection<IUserRecord>;
  constructor(private readonly db: Db) {
    this.collection = this.db.collection("users");
  }
  public async getOne(id: string): Promise<WithId<IUserRecord> | null> {
    const result = await this.collection.findOne({ _id: new ObjectId(id) });
    return result;
  }
}
