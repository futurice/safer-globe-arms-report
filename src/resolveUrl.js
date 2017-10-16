// This function resolves a local url agains the installation dir of the site
// e.g. if the site is hosted at blah.com/arms/ it resolves /imgs/foo.jpg to /arms/imgs/foo.jpg
export default function resolveUrl(path) {
  return process.env.PUBLIC_URL + (path.startsWith('/') ? '' : '/') + path;
}
