import { mock, MockProxy, anyString } from "jest-mock-extended";
import CustomerRepository, { IUserRecord } from "./customer.repository";
import CustomerService from "./customer.service";
import { ObjectId, WithId } from "mongodb";

describe("CustomerService", () => {
  // define mocks used in tests
  let repo: MockProxy<CustomerRepository>;
  let mockUserRecord: WithId<IUserRecord>;
  // define real object used in tests
  let service: CustomerService;
  beforeEach(() => {
    // initialize mocks used in tests
    repo = mock<CustomerRepository>();
    mockUserRecord = {
      _id: new ObjectId("1234567890ab1234567890ab"),
      firstName: "John",
      lastName: "Doe"
    };
    repo.getOne.calledWith(anyString()).mockResolvedValue(null);
    repo.getOne.calledWith("1234567890ab1234567890ab").mockResolvedValue(mockUserRecord);
    // repo.getOne.calledWith(anyString()).mockResolvedValue(null);
    // initalize the real object used in tests
    service = new CustomerService(repo);
  });
  describe("getById", () => {
    it("should return the given user by id by fetching the record and performing transformation on it", async () => {
      // execute
      const result = await service.getById("1234567890ab1234567890ab");
      await new Promise(resolve => setTimeout(resolve, 3000));
      // perform assertions
      expect(result).toEqual({
        id: "1234567890ab1234567890ab",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe"
      });
      // perform assertions on behavior
      expect(repo.getOne).toBeCalledTimes(1);
      expect(repo.getOne).toHaveBeenCalledWith("1234567890ab1234567890ab");
    });
    it("should return null if the user does not exist", async () => {
      // exeecute
      const result = await service.getById("some_other_value");
      // perform assertions on results
      expect(result).toBeNull();
      // perform assertions on behavior
      expect(repo.getOne).toBeCalledTimes(1);
      expect(repo.getOne).toHaveBeenCalledWith("some_other_value");
    });
  });
});
