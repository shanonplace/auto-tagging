var express = require("express");
var router = express.Router();
const contentful = require("contentful-management");
require("dotenv").config();

//hooks - index level GET test
router.get("/", function (req, res, next) {
  res.send("hello from the GET route to /");
});

//hooks/auto-tag POST
router.post("/auto-tag", function (req, res) {
  //grab the entryId from the request
  const entryId = req.body.sys.id;

  console.log(`entryId is ${entryId}`);

  //Create the contentful client
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CMA_KEY,
  });

  //get the entry for this Id, add a tag to it, and update the entry
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID)
    )
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      console.log(`Found entry ${entryId}`);
      const myTag = {
        sys: {
          type: "Link",
          linkType: "Tag",
          id: process.env.TAGNAME,
        },
      };
      entry.metadata.tags.push(myTag);

      console.log(`tagged entry ${entryId} with tag ${process.env.TAGNAME}`);

      return entry.update();
    })
    .catch((error) => {
      console.log(`Error getting entry ${entryId}`);
      console.log(error);
    });

  res.send(`Added tag to ${entryId}.`);
});

module.exports = router;
