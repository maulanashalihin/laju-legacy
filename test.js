import http from "http";
import Template from "./index.marko";

const port = 8080;
const server = http.createServer();

server.on("request", (req, res) => {
  Template.render(
    {
      name: "Frank",
      count: 30,
      colors: ["red", "green", "blue"]
    },
    res
  );
});

server.listen(port, () => {
  console.log(`Successfully started server on port ${port}`);
});