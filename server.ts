import jsonServer from "json-server";
import mockData from "./mock-data/index";
import clients from "./mock-data/clients";

const server = jsonServer.create();
const router = jsonServer.router(mockData);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

//@ts-ignore
router.render = (req, res) => {
  const url = req.originalUrl;
  if (
    url.includes("clients") &&
    url.includes("_limit") &&
    req.method === "GET"
  ) {
    res.jsonp({
      count: clients.length,
      clients: [...res.locals.data],
    });
  } else res.jsonp(res.locals.data);
};

server.listen(3000, () => {
  console.log("JSON Server is running");
});
