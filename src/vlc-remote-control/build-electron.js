"use strict"

const builder = require("electron-builder")

// Promise is returned
builder.build({
    appId: "vlc-remote-control",
    config: {
        "//": "build options, see https://goo.gl/ZhRfla"
  }
})
  .then(() => {
    // handle result
  })
  .catch((error) => {
    // handle error
  })