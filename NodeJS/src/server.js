/* eslint-disable no-console */
import app from "./app";

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("Server started on port 3000");
});
