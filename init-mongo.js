db.createUser({
  user: "myUser",
  pwd: "secret",
  roles: [
    {
      role: "readWrite",
      db: "best-tournament-app",
    },
  ],
});
