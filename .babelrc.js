module.exports = api => {
  const env = api.env();

  return {
    "presets": [
      [
        "@babel/env",
        {
          "loose": true,
          "shippedProposals": true,
          "modules": "commonjs",
          "targets": {
            "ie": 9
          }
        }
      ],
      "@babel/react"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ],
    "env": {
      "esm-dir": {
        "presets": [
          [
            "@babel/env",
            {
              "loose": true,
              "shippedProposals": true,
              "modules": false,
              "targets": {
                "ie": 9
              }
            }
          ],
          "@babel/react"
        ],
        "plugins": [
          [
            "@babel/plugin-transform-runtime",
            {
              "useESModules": true
            }
          ]
        ]
      }
    }
  }
}