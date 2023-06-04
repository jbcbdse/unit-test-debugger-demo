import CustomerRepository, { IUserRecord } from "./customer.repository";

export interface IUser extends IUserRecord {
  id: string;
  fullName: string;
}
export default class CustomerService {
  constructor(private readonly repo: CustomerRepository) {

  }
  public async getById(id: string): Promise<IUser | null> {
    const userRecord = await this.repo.getOne(id);
    if (!userRecord) {
      return null;
    }
    return {
      id,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      fullName: `${userRecord.firstName}${userRecord.lastName}`
    };
  }

  private getFullName(userRecord: IUserRecord): string {
    return `${userRecord.firstName} ${userRecord.lastName}`;
  }
}
