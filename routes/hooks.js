var express = require("express");
var router = express.Router();
const contentful = require("contentful-management");
const config = require("../config"); //or .env file

//hooks - index level GET test
router.get("/", function (req, res, next) {
  res.send("hello from the GET route to /hooks");
});

//hooks/auto-tag POST
router.post("/auto-tag", function (req, res) {
  //grab the entryId from the request
  const entryId = req.body.sys.id;

  //Create the contentful client
  const client = contentful.createClient({
    accessToken: config.contentful.CMAKey,
  });

  //get the entry for this Id, add a tag to it, and update the entry
  client
    .getSpace(config.contentful.spaceId)
    .then((space) => space.getEnvironment(config.contentful.environment))
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      const myTag = {
        sys: {
          type: "Link",
          linkType: "Tag",
          id: config.contentful.tagName,
        },
      };
      entry.metadata.tags.push(myTag);

      console.log(
        `tagged entry ${entryId} with tag ${config.contentful.tagName}`
      );

      return entry.update();
    })
    .catch(console.error);

  res.send(`Added tag to ${entryId}.`);
});

module.exports = router;
