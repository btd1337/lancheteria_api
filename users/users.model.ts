const users = [
  { id: "1", name: "Peter Parker", email: "peter@marvel.com" },
  { id: "2", name: "Bruce Wayne", email: "bruce@dc.com" }
];

export class User {
  public static findAll(): Promise<any> {
    return Promise.resolve(users);
  }

  public static findById(id: string): Promise<any> {
    return new Promise(resolve => {
      const user = users.find(currentUser => currentUser.id === id);
      resolve(user);
    });
  }
}
