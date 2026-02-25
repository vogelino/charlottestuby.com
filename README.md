![Social Image of the repository of charlottestuby.com](https://github.com/vogelino/charlottestuby.com/blob/master/Github-SocialImage.png?raw=true)

# Artist portfolio: [charlottestuby.com](https://charlottestuby.com)

Charlotte Stuby is a swiss artist based in Brussels. Her practice focuses mainly on objects and installations produced by varied materials such as concrete, wood, metal but mostly sewing and embroidery. This is the Github repository of her portfolio website.

## Tech stack

This website is build using [nextjs](https://nextjs.org/) and [netlify-cms](https://www.netlifycms.org/).

### Access Locally

Pulldown a local copy of the Github repository, install the npm dependencies and run the site locally

```
$ git clone https://github.com/vogelino/charottestuby.com.git
$ cd charlottestuby.com
$ npm install
$ npm run dev # Or `vercel dev` if configured with vercel
```

### CMS OAuth Setup

The CMS GitHub login now uses an in-app OAuth endpoint at `/api/auth` (instead of Glitch).

Set these environment variables where the site is deployed:

```
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
```

Legacy fallback names are also supported:

```
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

The GitHub OAuth app callback URL must be:

```
https://charlottestuby.com/api/auth
```
