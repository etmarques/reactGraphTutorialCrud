// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const config = {
    appId: 'b0a9fcde-855c-4a74-9190-da11ee9dca64',
    authority: "https://login.microsoftonline.com/4d79d37a-1e4e-4a39-9fde-f1631cb607d4",
    redirectUri: 'http://localhost:3000',
    scopes: [
      'user.read',
      'sites.read.all',
      'sites.readwrite.all',
    ]
  };
  
  export default config;