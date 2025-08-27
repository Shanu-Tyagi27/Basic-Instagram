const express = require("express");
const app = express();

const path = require("path"); // folders ko access krne ke liye path bnare

app.set("view engine", "ejs"); // ejs ko use krne ke liye
app.set("views", path.join(__dirname, "views")); // ye views vale folder ke liye path hai

app.use(express.static(path.join(__dirname, "public"))); // ye public vale folder ko access krne ke liye

app.use(express.urlencoded({ extended: true })); // post response ko handle krne ke liye in local server
app.use(express.json()); // post response ko handle krne ke liye in hoppscotch

const { v4: uuidv4 } = require("uuid"); //uuid generate krne ke liye
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride = require("method-override"); // ye form me patch method daalne ke liye
app.use(methodOverride("_method")); // ye bhi


let port = 8080;

let posts = [
  {
    id: uuidv4(),
    username: "Atul",
    caption: "I love this dog!",
    image: "https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small_2x/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg"
  },
  {
    id: uuidv4(),
    username: "Shanu Tyagi",
    caption: "These puppies have my heart",
    image:"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: uuidv4(),
    username: "Shubham",
    caption: "Just went for a 1 week trip!",
    image:"https://images.pexels.com/photos/130576/pexels-photo-130576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
];

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})

app.get("/posts",(req,res)=>{
    res.render("index",{posts});   
});

app.get("/posts/new",(req,res)=>{
  res.render("new",{posts});
});

app.post("/posts", (req, res) => {
  let { username, caption } = req.body;
  let id = uuidv4();
  let image = "https://images.pexels.com/photos/130576/pexels-photo-130576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ;
  posts.push({ id, username, caption,image });
  // res.send("post request working");
  res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
  let {id}= req.params; // ye vali rqquest ek specific post dekhne ke liye hai
  let post = posts.find((p) => p.id === id); // array method .find() is used here
  res.render("show",{post});
})

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id); // array method .filter use kra or jo bchi hui filtered post hain
  res.redirect("/posts");                   // vohi bahar aayi hain or is baar (id !== p.id) hai
});


app.patch("/posts/:id",(req,res)=>{
  let {id }= req.params;
  let newCaption = req.body.caption;
  let newImage = req.body.image;
  let post = posts.find((p) => id === p.id);
  post.caption = newCaption;  // ye vali request sirf hoppscotch ke liye hai iska inse koi lena dena ni h
  post.image = newImage;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit", { post });
});
