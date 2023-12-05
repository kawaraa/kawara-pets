module.exports = {
  // extends: "next/core-web-vitals",
  extends: ["next"],
  // plugins: ["unicorn"],
  rules: {
    "react/no-unescaped-entities": 0,
    "react-hooks/exhaustive-deps": "off",
    "prefer-const": "error",
    // "react-hooks/exhaustive-deps": "error",
    // "no-unused-vars": [
    //   "error",
    //   { args: "after-used", caughtErrors: "none", ignoreRestSiblings: true, vars: "all" },
    // ],
    // "unicorn/filename-case": ["error", { case: "kebabCase" }],
  },
};
