module.exports = {
  promptTypeList: [
    {
      type: "list",
      message: "Please select the template type to download:",
      name: "type",
      choices: [
        {
          name: "react-component-project",
          value: {
            url: "https://github.com/fribble186/react-component-template/archive/refs/tags/1.0.0.zip",
            val: "react-component-project",
          },
        },
      ],
    },
  ],
};
