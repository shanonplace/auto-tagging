# :rocket: Overview

This is a simple POC to show how multiple content types could be have a tag created and applied automatically whenever those types are created, utilizing webhooks and the Contentful Content Management API and JavaScript SDK

# :hammer_and_wrench: Creation

I created this little example by running the following commands to generate the boiler plate code

`npx express-generator --no-view --git auto-tagging`

`cd auto-tagging && npm install`

# :cd: Installation

Just clone the repo and then execute `npm install` in the folder

# :gear: Configuration

.env file should contain the following

```
TAGNAME=the-tag-name
CONTENTFUL_SPACE_ID=the-space-id
CONTENTFUL_ENVIRONMENT_ID=the-environment-id
CONTENTFUL_CMA_KEY=the-cma-key
```

---

> **Note:** Make sure you change your Content-Type header in the webhook to `application/json` or change the express settings to include the content vendor specific mime type

```app.use(
  express.json({
    type: ["application/json", "application/vnd.contentful.management.v1+json"],
  })
);
```

# Run

`npm start`

### Note: I know the code shouldn't be putting everthing in the controller, this was just for educational purposes :)

![Overview Flow](/Auto-Tagging%20Entries%20with%20Webhooks.jpg)

```

```
