const express = require("express");
const cors = require("cors");
const app = express();
const rangeMiddleware = require("./range"); // Import your range.js file

app.use(cors()); // Allow all CORS requests
// Use your custom range middleware to handle Content-Range header
app.use(rangeMiddleware);
app.options("*", cors()); // Respond to all OPTIONS requests
const fs = require("fs");
const { defaultMaxListeners } = require("events");

const PORT = process.env.PORT || 8000;

// Read the data from db.json
const rawData = fs.readFileSync("db.json");
const data = JSON.parse(rawData);

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to get all Arabic blogs
app.get("/arBlogs", (req, res) => {
  res.json(data.arBlogs);
});

// Endpoint to get a specific Arabic blog by ID
app.get("/arBlogs/:id", (req, res) => {
  const blog = data.arBlogs.find((blog) => blog.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(blog);
});

// Endpoint to create a new Arabic blog
app.post("/arBlogs", (req, res) => {
  const newBlog = req.body;
  data.arBlogs.push(newBlog);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(201).json(newBlog);
});

// Similar endpoints for updating and deleting Arabic blogs...
// // Update an existing Arabic blog
// app.put("/arBlogs/:id", (req, res) => {
//   const blog = data.arBlogs.find(
//     (blog) => blog.id.toString() === req.params.id.toString()
//   );
//   if (!blog) {
//     return res.status(404).json({ error: "Blog not found" });
//   }
//   blog.title = req.body.title;
//   blog.body = req.body.body;
//   // Save the updated data back to db.json (to mimic persistence)
//   fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
//   res.json(blog);
// });
// Update an existing Arabic blog
app.put("/arBlogs/:id", (req, res) => {
  const blog = data.arBlogs.find((blog) => blog.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  blog.category = req.body.category;
  blog.firstHeading = req.body.firstHeading;
  blog.secondHeading = req.body.secondHeading;
  blog.thirdHeading = req.body.thirdHeading;
  blog.firstBanner = req.body.firstBanner;
  blog.secondBanner = req.body.secondBanner;
  blog.firstParagraph = req.body.firstParagraph;
  blog.secondParagraph = req.body.secondParagraph;
  blog.thirdParagraph = req.body.thirdParagraph;
  blog.title = req.body.title;
  blog.desc = req.body.desc;
  blog.image = req.body.image;
  blog.date = req.body.date;

  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(blog);
});

// Delete a blog from the collection
app.delete("/arBlogs/:id", (req, res) => {
  const blogIndex = data.arBlogs.findIndex(
    (blog) => blog.id.toString() === req.params.id.toString()
  );
  if (blogIndex === -1) {
    return res.status(404).json({ error: "Blog not found" });
  }
  data.arBlogs.splice(blogIndex, 1);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(204).end();
});
// Endpoint to get all English blogs "/enBlogs"
app.get("/enBlogs", (req, res) => {
  res.json(data.enBlogs);
});
// Endpoint to get a specific English blog by ID
app.get("/enBlogs/:id", (req, res) => {
  const blog = data.enBlogs.find(
    (blog) => blog.id.toString() === req.params.id.toString()
  );
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(blog);
});

// Endpoint to create a new English blog
app.post("/enBlogs", (req, res) => {
  const newBlog = req.body;
  data.enBlogs.push(newBlog);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(201).json(newBlog);
});

// Similar endpoints for updating and deleting English blogs...
// Update an existing English blog
app.put("/enBlogs/:id", (req, res) => {
  const blog = data.enBlogs.find(
    (blog) => blog.id.toString() === req.params.id.toString()
  );
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  blog.category = req.body.category;
  blog.firstHeading = req.body.firstHeading;
  blog.secondHeading = req.body.secondHeading;
  blog.thirdHeading = req.body.thirdHeading;
  blog.firstBanner = req.body.firstBanner;
  blog.secondBanner = req.body.secondBanner;
  blog.firstParagraph = req.body.firstParagraph;
  blog.secondParagraph = req.body.secondParagraph;
  blog.thirdParagraph = req.body.thirdParagraph;
  blog.title = req.body.title;
  blog.desc = req.body.desc;
  blog.image = req.body.image;
  blog.date = req.body.date;

  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(blog);
});
// Delete a blog from the collection
app.delete("/enBlogs/:id", (req, res) => {
  const blogIndex = data.enBlogs.findIndex(
    (blog) => blog.id.toString() === req.params.id.toString()
  );
  if (blogIndex === -1) {
    return res.status(404).json({ error: "Blog not found" });
  }
  data.enBlogs.splice(blogIndex, 1);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(204).end();
});

// Endpoint to get all projects
app.get("/projects", (req, res) => {
  res.json(data.projects);
});

// Endpoint to get a specific project by ID
app.get("/projects/:id", (req, res) => {
  const project = data.projects.find(
    (project) => project.id.toString() === req.params.id.toString()
  );
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});
// Add a new project
app.post("/projects", (req, res) => {
  const newProject = req.body;
  data.projects.push(newProject);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(201).json(newProject);
});
// Update an existing project
app.put("/projects/:id", (req, res) => {
  const project = data.projects.find(
    (project) => project.id.toString() === req.params.id.toString()
  );
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  project.category = req.body.category;
  project.title = req.body.title;
  project.image = req.body.image;
  project.behance = req.body.behance;
  project.dribbble = req.body.dribbble;
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(project);
});

// Delete a project from the collection
app.delete("/projects/:id", (req, res) => {
  const projectIndex = data.projects.findIndex(
    (project) => project.id.toString() === req.params.id.toString()
  );
  if (projectIndex === -1) {
    return res.status(404).json({ error: "Project not found" });
  }
  data.projects.splice(projectIndex, 1);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(204).end();
});

// endpoint for all certificates
app.get("/certificates", (req, res) => {
  res.json(data.certificates);
});
// other crud operations for certificates
app.get("/certificates/:id", (req, res) => {
  const certificate = data.certificates.find(
    (certificate) => certificate.id.toString() === req.params.id.toString()
  );
  if (!certificate) {
    return res.status(404).json({ error: "Certificate not found" });
  }
  res.json(certificate);
});
// Add a new certificate
app.post("/certificates", (req, res) => {
  const newCertificate = req.body;
  data.certificates.push(newCertificate);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(201).json(newCertificate);
});

// Update an existing certificate
app.put("/certificates/:id", (req, res) => {
  const certificate = data.certificates.find(
    (certificate) => certificate.id.toString() === req.params.id.toString()
  );
  if (!certificate) {
    return res.status(404).json({ error: "Certificate not found" });
  }
  certificate.link = req.body.link;
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(certificate);
});
// Delete a certificate from the collection
app.delete("/certificates/:id", (req, res) => {
  const certificateIndex = data.certificates.findIndex(
    (certificate) => certificate.id.toString() === req.params.id.toString()
  );
  if (certificateIndex === -1) {
    return res.status(404).json({ error: "Certificate not found" });
  }
  data.certificates.splice(certificateIndex, 1);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(204).end();
});

// endpoint for cv
app.get("/cv", (req, res) => {
  res.json(data.cv);
});
// other crud operations for cv
app.get("/cv/:id", (req, res) => {
  const cv = data.cv.find((cv) => cv.id.toString() == req.params.id.toString());
  if (!cv) {
    return res.status(404).json({ error: "CV not found" });
  }
  res.json(cv);
});
// Add a new cv
app.post("/cv", (req, res) => {
  const newCv = req.body;
  data.cv.push(newCv);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(201).json(newCv);
});
// Update an existing cv
app.put("/cv/:id", (req, res) => {
  const cv = data.cv.find(
    (cv) => cv.id.toString() === req.params.id.toString()
  );
  if (!cv) {
    return res.status(404).json({ error: "CV not found" });
  }
  cv.link = req.body.link; // Update the link property
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(cv);
});

// Delete a cv from the collection
app.delete("/cv/:id", (req, res) => {
  const cvIndex = data.cv.findIndex(
    (cv) => cv.id.toString() === req.params.id.toString()
  );
  if (cvIndex === -1) {
    return res.status(404).json({ error: "CV not found" });
  }
  data.cv.splice(cvIndex, 1);
  // Save the updated data back to db.json (to mimic persistence)
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
