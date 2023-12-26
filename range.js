module.exports = (req, res, next) => {
  // Calculate total number of items based on the requested resource
  const totalItems = req.path === "/enblogs" ? 6 : 10; // Adjust based on your data

  // Get the requested page number from the request headers
  const pageParam = req.headers["x-pagination-page"] || 1;
  const pageSize = 3; // Assuming a page size of 3

  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  const range = `${startIndex + 1}-${endIndex + 1}/${totalItems}`;

  res.header("Content-Range", range);
  res.header("Access-Control-Expose-Headers", "Content-Range");
  next();
};
