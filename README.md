# Chrome extension

#### Created with `@crx-tools/create-app`

## Sample Extension
The sample extension runs on `http://google.com/`. To install it in Chrome, go to `chrome://extensions` and toggle 
"Developer Mode" to on, then click "Load unpacked" and open the `dist` directory.

## Scripts

### setup

This creates a public/private keypair used to build the extension. Building an extension with a key ensures the
extension id won't change between builds.

### build
This builds a Chrome extension into the dist folder.

### watch
This builds a Chrome extension, and rebuilds when source files change. It also serves an endpoint so that the extension
can subscribe to changes, and reregister content scripts when they change.

