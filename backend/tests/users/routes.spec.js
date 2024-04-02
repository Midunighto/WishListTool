/* // Import required dependencies
const { app, request } = require("../setup");

const tables = {
  user: {
    create: jest.fn(),
    read: jest.fn(),
  },
};

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      pseudo: `Test User ${Date.now()}`,
      email: `testusers${Date.now()}@example.com`,
      password: "password",
    };

    // Mock the tables.user.create function to return a fake insertId
    tables.user.create.mockResolvedValue({ insertId: 1 });

    // Mock the tables.user.read function to return an array of users
    tables.user.read.mockResolvedValue([{ id: 1, ...testUser }]);

    // Send a GET request to the /api/users endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created user is present in the response
    const foundUser = response.body.find((user) => user.id === 1);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.pseudo).toBe(testUser.pseudo);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/users/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      pseudo: `Test User ${Date.now()}`,
      email: `testsingleuser${Date.now()}@example.com`,
      password: "password",
    };

    // Mock the tables.user.create function to return a fake insertId
    tables.user.create.mockResolvedValue({ insertId: 1 });

    // Mock the tables.user.read function to return the testUser
    tables.user.read.mockResolvedValue({ id: 1, ...testUser });

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(1);
    expect(response.body.pseudo).toBe(testUser.pseudo);
  });

  it("should return 404 for non-existent user", async () => {
    // Mock the tables.user.read function to return undefined
    tables.user.read.mockResolvedValue(undefined);

    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      pseudo: `Test User ${Date.now()}`,
      email: `testuser${Date.now()}@example.com`,
      password: "password",
    };

    // Mock the tables.user.create function to return a fake insertId
    tables.user.create.mockResolvedValue({ insertId: 1 });

    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app).post("/api/users").send(testUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Mock the tables.user.read function to return the testUser
    tables.user.read.mockResolvedValue({ id: 1, ...testUser });

    // Check if the newly added user exists in the database
    const foundUser = await tables.user.read(response.body.insertId);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(response.body.insertId);
  });
});
// TODO: implement PUT and DELETE routes */