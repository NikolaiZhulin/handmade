"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/post/[id]",{

/***/ "./src/layout/RightBlockPost/components/CategoryBadge.tsx":
/*!****************************************************************!*\
  !*** ./src/layout/RightBlockPost/components/CategoryBadge.tsx ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CategoryBadge: function() { return /* binding */ CategoryBadge; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers_getTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/helpers/getTime */ \"./src/helpers/getTime.ts\");\n/* harmony import */ var _hooks_useTranslation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/hooks/useTranslation */ \"./src/hooks/useTranslation.ts\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/utils */ \"./src/utils/utils.ts\");\n/* harmony import */ var _ui_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/ui/Typography */ \"./src/ui/Typography/index.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst CategoryBadge = (param)=>{\n    let { value, time } = param;\n    _s();\n    const { t } = (0,_hooks_useTranslation__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(\"flex items-center justify-between py-[8px]\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"text2\",\n                className: (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(\"px-[10px] py-[4px] bg-light-gray rounded-[4px] overflow-hidden\"),\n                children: t(\"categories.\".concat(value))\n            }, void 0, false, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/layout/RightBlockPost/components/CategoryBadge.tsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined),\n            time && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"heading5\",\n                color: \"gray\",\n                children: (0,_helpers_getTime__WEBPACK_IMPORTED_MODULE_1__.getCreatedAtDatePhrase)(time, t)\n            }, void 0, false, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/layout/RightBlockPost/components/CategoryBadge.tsx\",\n                lineNumber: 25,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/layout/RightBlockPost/components/CategoryBadge.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, undefined);\n};\n_s(CategoryBadge, \"zlIdU9EjM2llFt74AbE2KsUJXyM=\", false, function() {\n    return [\n        _hooks_useTranslation__WEBPACK_IMPORTED_MODULE_2__.useTranslation\n    ];\n});\n_c = CategoryBadge;\nvar _c;\n$RefreshReg$(_c, \"CategoryBadge\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0L1JpZ2h0QmxvY2tQb3N0L2NvbXBvbmVudHMvQ2F0ZWdvcnlCYWRnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRTJEO0FBQ0g7QUFDckI7QUFDTTtBQU9sQyxNQUFNSSxnQkFBNEI7UUFBQyxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRTs7SUFDdkQsTUFBTSxFQUFFQyxDQUFDLEVBQUUsR0FBR04scUVBQWNBO0lBRTVCLHFCQUNFLDhEQUFDTztRQUFJQyxXQUFXUCxnREFBRUEsQ0FBQzs7MEJBQ2pCLDhEQUFDQyxzREFBVUE7Z0JBQ1RPLFNBQVE7Z0JBQ1JELFdBQVdQLGdEQUFFQSxDQUFDOzBCQUViSyxFQUFFLGNBQW9CLE9BQU5GOzs7Ozs7WUFFbEJDLHNCQUNDLDhEQUFDSCxzREFBVUE7Z0JBQUNPLFNBQVE7Z0JBQVdDLE9BQU07MEJBQ2xDWCx3RUFBc0JBLENBQUNNLE1BQU1DOzs7Ozs7Ozs7Ozs7QUFLeEMsRUFBRTtHQWxCV0g7O1FBQ0dILGlFQUFjQTs7O0tBRGpCRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbGF5b3V0L1JpZ2h0QmxvY2tQb3N0L2NvbXBvbmVudHMvQ2F0ZWdvcnlCYWRnZS50c3g/ZGIyZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQyB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0Q3JlYXRlZEF0RGF0ZVBocmFzZSB9IGZyb20gJ0AvaGVscGVycy9nZXRUaW1lJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnQC9ob29rcy91c2VUcmFuc2xhdGlvbic7XG5pbXBvcnQgeyBjbiB9IGZyb20gJ0AvdXRpbHMvdXRpbHMnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQC91aS9UeXBvZ3JhcGh5JztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBDYXRlZ29yeUJhZGdlOiBGQzxJUHJvcHM+ID0gKHsgdmFsdWUsIHRpbWUgfSkgPT4ge1xuICBjb25zdCB7IHQgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y24oJ2ZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweS1bOHB4XScpfT5cbiAgICAgIDxUeXBvZ3JhcGh5XG4gICAgICAgIHZhcmlhbnQ9XCJ0ZXh0MlwiXG4gICAgICAgIGNsYXNzTmFtZT17Y24oJ3B4LVsxMHB4XSBweS1bNHB4XSBiZy1saWdodC1ncmF5IHJvdW5kZWQtWzRweF0gb3ZlcmZsb3ctaGlkZGVuJyl9XG4gICAgICA+XG4gICAgICAgIHt0KGBjYXRlZ29yaWVzLiR7dmFsdWV9YCl9XG4gICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICB7dGltZSAmJiAoXG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoZWFkaW5nNVwiIGNvbG9yPVwiZ3JheVwiPlxuICAgICAgICAgIHtnZXRDcmVhdGVkQXREYXRlUGhyYXNlKHRpbWUsIHQpfVxuICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJnZXRDcmVhdGVkQXREYXRlUGhyYXNlIiwidXNlVHJhbnNsYXRpb24iLCJjbiIsIlR5cG9ncmFwaHkiLCJDYXRlZ29yeUJhZGdlIiwidmFsdWUiLCJ0aW1lIiwidCIsImRpdiIsImNsYXNzTmFtZSIsInZhcmlhbnQiLCJjb2xvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/layout/RightBlockPost/components/CategoryBadge.tsx\n"));

/***/ })

});