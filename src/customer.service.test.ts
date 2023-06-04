import { Mock, IMock, It, Times } from "typemoq";
import CustomerRepository, { IUserRecord } from "./customer.repository";
import CustomerService from "./customer.service";
import should from "should";
import { ObjectId, WithId } from "mongodb";

describe("CustomerService", () => {
  // define mocks used in tests
  let repo: IMock<CustomerRepository>;
  let mockUserRecord: WithId<IUserRecord>;
  // define real object used in tests
  let service: CustomerService;
  beforeEach(() => {
    // initialize mocks used in tests
    repo = Mock.ofType<CustomerRepository>();
    mockUserRecord = {
      _id: new ObjectId("1234567890ab1234567890ab"),
      firstName: "John",
      lastName: "Doe"
    };
    repo.setup(x => x.getOne("1234567890ab1234567890ab")).returns(async () => mockUserRecord);
    repo.setup(x => x.getOne(It.isAnyString())).returns(async () => null);
    // initalize the real object used in tests
    service = new CustomerService(repo.object);
  });
  describe("getById", () => {
    it("should return the given user by id by fetching the record and performing transformation on it", async () => {
      // execute
      const result = await service.getById("1234567890ab1234567890ab");
      await new Promise(resolve => setTimeout(resolve, 1500));
      // perform assertions
      should(result).eql({
        id: "1234567890ab1234567890ab",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe"
      });
      // perform assertions on behavior
      repo.verify(x => x.getOne("1234567890ab1234567890ab"), Times.once());
    });
    it("should return null if the user does not exist", async () => {
      // exeecute
      const result = await service.getById("some_other_value");
      // perform assertions on results
      should(result).be.null();
      // perform assertions on behavior
      repo.verify(x => x.getOne("some_other_value"), Times.once());
    });
  });
});
