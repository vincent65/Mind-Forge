import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connectiosn and listeners
const PORT = process.env.PORT || 3001;
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server Open and connected to the database"));
})
    .catch((err) => console.log(err));
// app.listen(3000, ()=>console.log("Server Open"));
//static routing: one size fits all route
//dynamic routing: user-specific routes, user id built into route
/*
Example of dynamic routes
app.delete("/user/:userid", (req,res, next) => {
  console.log(req.params.userid);
  return res.send("Hello");
})
 */
//routing
/*
get: pull data
app.get("/hello", (req, res, next)=>{
   return res.send("Hello");
 });

*/
//post: send data, create new entry
/*
app.use(express.json()); this line parses all incoming requests as json
app.post("/hello", (req, res, next)=>{
  console.log(req.body.name);
  return res.send("Hello");
});
*/
//put: modify or update data
//delete: delete data
//# sourceMappingURL=index.js.map