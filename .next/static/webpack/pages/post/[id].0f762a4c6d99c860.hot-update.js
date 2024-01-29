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

/***/ "./src/pages/post/[id].tsx":
/*!*********************************!*\
  !*** ./src/pages/post/[id].tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Header */ \"./src/components/Header/index.tsx\");\n/* harmony import */ var _layout_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/layout/Container */ \"./src/layout/Container/index.tsx\");\n/* harmony import */ var _layout_MainWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/layout/MainWrapper */ \"./src/layout/MainWrapper/index.tsx\");\n/* harmony import */ var _layout_LeftBlockPost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/layout/LeftBlockPost */ \"./src/layout/LeftBlockPost/index.tsx\");\n/* harmony import */ var _layout_Main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/layout/Main */ \"./src/layout/Main/index.tsx\");\n/* harmony import */ var _components_PostDescription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/PostDescription */ \"./src/components/PostDescription/index.tsx\");\n/* harmony import */ var _components_OtherAnnouncement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/OtherAnnouncement */ \"./src/components/OtherAnnouncement/index.tsx\");\n/* harmony import */ var _layout_RightBlockPost__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/layout/RightBlockPost */ \"./src/layout/RightBlockPost/index.tsx\");\n/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/Footer */ \"./src/components/Footer/index.tsx\");\n/* harmony import */ var _components_ImagesPost__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/ImagesPost */ \"./src/components/ImagesPost/index.tsx\");\n/* harmony import */ var _components_BanerTop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/components/BanerTop */ \"./src/components/BanerTop/index.tsx\");\n/* harmony import */ var _hooks_useTranslation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/hooks/useTranslation */ \"./src/hooks/useTranslation.ts\");\n/* harmony import */ var _helpers_capitalize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/helpers/capitalize */ \"./src/helpers/capitalize.ts\");\n/* harmony import */ var _components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/components/Breadcrumbs */ \"./src/components/Breadcrumbs/index.tsx\");\n/* harmony import */ var _constants_categories__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/constants/categories */ \"./src/constants/categories.tsx\");\n/* harmony import */ var _hooks_useMediaQuery__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/hooks/useMediaQuery */ \"./src/hooks/useMediaQuery.ts\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst PostPage = (param)=>{\n    let { post } = param;\n    var _categories_find;\n    _s();\n    const { t, i18n: { language } } = (0,_hooks_useTranslation__WEBPACK_IMPORTED_MODULE_13__.useTranslation)();\n    const isLaptop = (0,_hooks_useMediaQuery__WEBPACK_IMPORTED_MODULE_17__.useMediaQuery)(\"(max-width: 1200px)\");\n    const langs = [\n        post.textRu,\n        post.textEn,\n        post.textGe\n    ];\n    let currentLangText = post[\"text\".concat((0,_helpers_capitalize__WEBPACK_IMPORTED_MODULE_14__.capitalize)(language))];\n    if (!currentLangText) {\n        currentLangText = langs.find((el)=>el);\n    }\n    console.log(post);\n    var _categories_find_label;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Create Next App\"\n                    }, void 0, false, {\n                        fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Generated by create next app\"\n                    }, void 0, false, {\n                        fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                        lineNumber: 55,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                isHideSearch: true,\n                isHideCounter: true,\n                className: \"2xl:!pb-[14px]\"\n            }, void 0, false, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_Main__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                className: \"xs:!pt-[60px] 2xl:!pt-[72px]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_Container__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BanerTop__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                            lineNumber: 60,\n                            columnNumber: 11\n                        }, undefined),\n                        !isLaptop && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n                            currentPath: t((_categories_find_label = (_categories_find = _constants_categories__WEBPACK_IMPORTED_MODULE_16__.categories.find((el)=>post.categories.includes(el.value))) === null || _categories_find === void 0 ? void 0 : _categories_find.label) !== null && _categories_find_label !== void 0 ? _categories_find_label : \"\"),\n                            currentLink: \"/search?category=\".concat(post.categories[0])\n                        }, void 0, false, {\n                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                            lineNumber: 62,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_MainWrapper__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            className: \"justify-between 2xl:flex-col 2xl:w-full 2xl:!mt-0 !mt-[14px]\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_LeftBlockPost__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    className: \"w-[895px] 2xl:!w-full 2xl:!rounded-none\",\n                                    children: [\n                                        !!post.images.length && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ImagesPost__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n                                            images: post.images\n                                        }, void 0, false, {\n                                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                            lineNumber: 71,\n                                            columnNumber: 40\n                                        }, undefined),\n                                        isLaptop && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_RightBlockPost__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                            price: post.price,\n                                            currency: post.currency,\n                                            time: post.updatedAt,\n                                            postCategories: post.categories,\n                                            city: post.city,\n                                            address: post.address,\n                                            contacts: post.contacts,\n                                            id: post.id\n                                        }, void 0, false, {\n                                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                            lineNumber: 73,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        currentLangText && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostDescription__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                            text: currentLangText,\n                                            postId: post.id\n                                        }, void 0, false, {\n                                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                            lineNumber: 84,\n                                            columnNumber: 35\n                                        }, undefined),\n                                        !!post.userPosts.length && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_OtherAnnouncement__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                            posts: post.userPosts,\n                                            totalCount: post.userPostsCount,\n                                            userId: post.user.id\n                                        }, void 0, false, {\n                                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                            lineNumber: 86,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                    lineNumber: 70,\n                                    columnNumber: 13\n                                }, undefined),\n                                !isLaptop && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_RightBlockPost__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                    price: post.price,\n                                    currency: post.currency,\n                                    time: post.updatedAt,\n                                    postCategories: post.categories,\n                                    city: post.city,\n                                    address: post.address,\n                                    contacts: post.contacts,\n                                    id: post.id\n                                }, void 0, false, {\n                                    fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                                    lineNumber: 94,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                            lineNumber: 69,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                    lineNumber: 59,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                lineNumber: 58,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Footer__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/macbook/Projects/handmadeokro-frontend/src/pages/post/[id].tsx\",\n                lineNumber: 109,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(PostPage, \"g81HEhS6VCCLbkcV2j4rJqQFSbc=\", false, function() {\n    return [\n        _hooks_useTranslation__WEBPACK_IMPORTED_MODULE_13__.useTranslation,\n        _hooks_useMediaQuery__WEBPACK_IMPORTED_MODULE_17__.useMediaQuery\n    ];\n});\n_c = PostPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostPage);\nvar _c;\n$RefreshReg$(_c, \"PostPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFOzs7Ozs7Ozs7Ozs7Z0NBSXpCLENBQUNuQywwQkFDQSw4REFBQ2QsOERBQWNBO29DQUNieUMsT0FBTy9CLEtBQUsrQixLQUFLO29DQUNqQkMsVUFBVWhDLEtBQUtnQyxRQUFRO29DQUN2QkMsTUFBTWpDLEtBQUtrQyxTQUFTO29DQUNwQkMsZ0JBQWdCbkMsS0FBS0gsVUFBVTtvQ0FDL0J1QyxNQUFNcEMsS0FBS29DLElBQUk7b0NBQ2ZDLFNBQVNyQyxLQUFLcUMsT0FBTztvQ0FDckJDLFVBQVV0QyxLQUFLc0MsUUFBUTtvQ0FDdkJDLElBQUl2QyxLQUFLdUMsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBT3JCLDhEQUFDaEQsMkRBQU1BOzs7Ozs7O0FBR2I7R0E1RU1ROztRQUlBTCxrRUFBY0E7UUFDREksZ0VBQWFBOzs7S0FMMUJDOztBQThFTiwrREFBZUEsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvcG9zdC9baWRdLnRzeD84NThhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wc0NvbnRleHQsIEluZmVyR2V0U2VydmVyU2lkZVByb3BzVHlwZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IHNlcnZlclNpZGVUcmFuc2xhdGlvbnMgfSBmcm9tICduZXh0LWkxOG5leHQvc2VydmVyU2lkZVRyYW5zbGF0aW9ucyc7XG5cbmltcG9ydCB7IGdldFBvc3RCeUlkIH0gZnJvbSAnQC9hcGkvcG9zdHMvcG9zdC1ieS1pZCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0AvY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdAL2xheW91dC9Db250YWluZXInO1xuaW1wb3J0IE1haW5XcmFwcGVyIGZyb20gJ0AvbGF5b3V0L01haW5XcmFwcGVyJztcbmltcG9ydCBMZWZ0QmxvY2tQb3N0IGZyb20gJ0AvbGF5b3V0L0xlZnRCbG9ja1Bvc3QnO1xuaW1wb3J0IE1haW4gZnJvbSAnQC9sYXlvdXQvTWFpbic7XG5pbXBvcnQgUG9zdERlc2NyaXB0aW9uIGZyb20gJ0AvY29tcG9uZW50cy9Qb3N0RGVzY3JpcHRpb24nO1xuaW1wb3J0IE90aGVyQW5ub3VuY2VtZW50IGZyb20gJ0AvY29tcG9uZW50cy9PdGhlckFubm91bmNlbWVudCc7XG5pbXBvcnQgUmlnaHRCbG9ja1Bvc3QgZnJvbSAnQC9sYXlvdXQvUmlnaHRCbG9ja1Bvc3QnO1xuaW1wb3J0IEZvb3RlciBmcm9tICdAL2NvbXBvbmVudHMvRm9vdGVyJztcbmltcG9ydCBJbWFnZXNQb3N0IGZyb20gJ0AvY29tcG9uZW50cy9JbWFnZXNQb3N0JztcbmltcG9ydCBCYW5lclRvcCBmcm9tICdAL2NvbXBvbmVudHMvQmFuZXJUb3AnO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdAL2hvb2tzL3VzZVRyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICdAL2hlbHBlcnMvY2FwaXRhbGl6ZSc7XG5pbXBvcnQgQnJlYWRjcnVtYnMgZnJvbSAnQC9jb21wb25lbnRzL0JyZWFkY3J1bWJzJztcbmltcG9ydCB7IGNhdGVnb3JpZXMgfSBmcm9tICdAL2NvbnN0YW50cy9jYXRlZ29yaWVzJztcbmltcG9ydCB7IHVzZU1lZGlhUXVlcnkgfSBmcm9tICdAL2hvb2tzL3VzZU1lZGlhUXVlcnknO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGN0eDogR2V0U2VydmVyU2lkZVByb3BzQ29udGV4dDx7IGlkOiBzdHJpbmcgfT4pID0+IHtcbiAgY29uc3QgcGFyYW1zID0gY3R4LnBhcmFtcztcbiAgY29uc3QgdG9rZW4gPSBjdHgucmVxLmNvb2tpZXMudW5saW1fYWNjZXNzVG9rZW47XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRQb3N0QnlJZCh7IGlkOiBwYXJhbXM/LmlkID8/ICcnIH0sIHRva2VuKTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBwb3N0OiBkYXRhLFxuICAgICAgLi4uKGF3YWl0IHNlcnZlclNpZGVUcmFuc2xhdGlvbnMoY3R4LmxvY2FsZSA/PyBjdHguZGVmYXVsdExvY2FsZSA/PyAnJywgWydjb21tb24nXSkpLFxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBQb3N0UGFnZSA9ICh7IHBvc3QgfTogSW5mZXJHZXRTZXJ2ZXJTaWRlUHJvcHNUeXBlPHR5cGVvZiBnZXRTZXJ2ZXJTaWRlUHJvcHM+KSA9PiB7XG4gIGNvbnN0IHtcbiAgICB0LFxuICAgIGkxOG46IHsgbGFuZ3VhZ2UgfSxcbiAgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gIGNvbnN0IGlzTGFwdG9wID0gdXNlTWVkaWFRdWVyeSgnKG1heC13aWR0aDogMTIwMHB4KScpO1xuXG4gIGNvbnN0IGxhbmdzID0gW3Bvc3QudGV4dFJ1LCBwb3N0LnRleHRFbiwgcG9zdC50ZXh0R2VdO1xuICBsZXQgY3VycmVudExhbmdUZXh0ID0gcG9zdFtgdGV4dCR7Y2FwaXRhbGl6ZShsYW5ndWFnZSl9YCBhcyBrZXlvZiB0eXBlb2YgcG9zdF0gYXMgc3RyaW5nO1xuICBpZiAoIWN1cnJlbnRMYW5nVGV4dCkge1xuICAgIGN1cnJlbnRMYW5nVGV4dCA9IGxhbmdzLmZpbmQoKGVsKSA9PiBlbCkgYXMgc3RyaW5nO1xuICB9XG4gIGNvbnNvbGUubG9nKHBvc3QpXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+Q3JlYXRlIE5leHQgQXBwPC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkdlbmVyYXRlZCBieSBjcmVhdGUgbmV4dCBhcHBcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8SGVhZGVyIGlzSGlkZVNlYXJjaD17dHJ1ZX0gaXNIaWRlQ291bnRlcj17dHJ1ZX0gY2xhc3NOYW1lPVwiMnhsOiFwYi1bMTRweF1cIiAvPlxuICAgICAgPE1haW4gY2xhc3NOYW1lPVwieHM6IXB0LVs2MHB4XSAyeGw6IXB0LVs3MnB4XVwiPlxuICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgIDxCYW5lclRvcCAvPlxuICAgICAgICAgIHshaXNMYXB0b3AgJiYgKFxuICAgICAgICAgICAgPEJyZWFkY3J1bWJzXG4gICAgICAgICAgICAgIGN1cnJlbnRQYXRoPXt0KFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXMuZmluZCgoZWwpID0+IHBvc3QuY2F0ZWdvcmllcy5pbmNsdWRlcyhlbC52YWx1ZSkpPy5sYWJlbCA/PyAnJyxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgY3VycmVudExpbms9e2Avc2VhcmNoP2NhdGVnb3J5PSR7cG9zdC5jYXRlZ29yaWVzWzBdfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPE1haW5XcmFwcGVyIGNsYXNzTmFtZT1cImp1c3RpZnktYmV0d2VlbiAyeGw6ZmxleC1jb2wgMnhsOnctZnVsbCAyeGw6IW10LTAgIW10LVsxNHB4XVwiPlxuICAgICAgICAgICAgPExlZnRCbG9ja1Bvc3QgY2xhc3NOYW1lPVwidy1bODk1cHhdIDJ4bDohdy1mdWxsIDJ4bDohcm91bmRlZC1ub25lXCI+XG4gICAgICAgICAgICAgIHshIXBvc3QuaW1hZ2VzLmxlbmd0aCAmJiA8SW1hZ2VzUG9zdCBpbWFnZXM9e3Bvc3QuaW1hZ2VzfSAvPn1cbiAgICAgICAgICAgICAge2lzTGFwdG9wICYmIChcbiAgICAgICAgICAgICAgICA8UmlnaHRCbG9ja1Bvc3RcbiAgICAgICAgICAgICAgICAgIHByaWNlPXtwb3N0LnByaWNlfVxuICAgICAgICAgICAgICAgICAgY3VycmVuY3k9e3Bvc3QuY3VycmVuY3l9XG4gICAgICAgICAgICAgICAgICB0aW1lPXtwb3N0LnVwZGF0ZWRBdH1cbiAgICAgICAgICAgICAgICAgIHBvc3RDYXRlZ29yaWVzPXtwb3N0LmNhdGVnb3JpZXN9XG4gICAgICAgICAgICAgICAgICBjaXR5PXtwb3N0LmNpdHl9XG4gICAgICAgICAgICAgICAgICBhZGRyZXNzPXtwb3N0LmFkZHJlc3N9XG4gICAgICAgICAgICAgICAgICBjb250YWN0cz17cG9zdC5jb250YWN0c31cbiAgICAgICAgICAgICAgICAgIGlkPXtwb3N0LmlkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtjdXJyZW50TGFuZ1RleHQgJiYgPFBvc3REZXNjcmlwdGlvbiB0ZXh0PXtjdXJyZW50TGFuZ1RleHR9IHBvc3RJZD17cG9zdC5pZH0gLz59XG4gICAgICAgICAgICAgIHshIXBvc3QudXNlclBvc3RzLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPE90aGVyQW5ub3VuY2VtZW50XG4gICAgICAgICAgICAgICAgICBwb3N0cz17cG9zdC51c2VyUG9zdHN9XG4gICAgICAgICAgICAgICAgICB0b3RhbENvdW50PXtwb3N0LnVzZXJQb3N0c0NvdW50fVxuICAgICAgICAgICAgICAgICAgdXNlcklkPXtwb3N0LnVzZXIuaWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvTGVmdEJsb2NrUG9zdD5cbiAgICAgICAgICAgIHshaXNMYXB0b3AgJiYgKFxuICAgICAgICAgICAgICA8UmlnaHRCbG9ja1Bvc3RcbiAgICAgICAgICAgICAgICBwcmljZT17cG9zdC5wcmljZX1cbiAgICAgICAgICAgICAgICBjdXJyZW5jeT17cG9zdC5jdXJyZW5jeX1cbiAgICAgICAgICAgICAgICB0aW1lPXtwb3N0LnVwZGF0ZWRBdH1cbiAgICAgICAgICAgICAgICBwb3N0Q2F0ZWdvcmllcz17cG9zdC5jYXRlZ29yaWVzfVxuICAgICAgICAgICAgICAgIGNpdHk9e3Bvc3QuY2l0eX1cbiAgICAgICAgICAgICAgICBhZGRyZXNzPXtwb3N0LmFkZHJlc3N9XG4gICAgICAgICAgICAgICAgY29udGFjdHM9e3Bvc3QuY29udGFjdHN9XG4gICAgICAgICAgICAgICAgaWQ9e3Bvc3QuaWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvTWFpbldyYXBwZXI+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9NYWluPlxuXG4gICAgICA8Rm9vdGVyIC8+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0UGFnZTtcbiJdLCJuYW1lcyI6WyJIZWFkIiwiSGVhZGVyIiwiQ29udGFpbmVyIiwiTWFpbldyYXBwZXIiLCJMZWZ0QmxvY2tQb3N0IiwiTWFpbiIsIlBvc3REZXNjcmlwdGlvbiIsIk90aGVyQW5ub3VuY2VtZW50IiwiUmlnaHRCbG9ja1Bvc3QiLCJGb290ZXIiLCJJbWFnZXNQb3N0IiwiQmFuZXJUb3AiLCJ1c2VUcmFuc2xhdGlvbiIsImNhcGl0YWxpemUiLCJCcmVhZGNydW1icyIsImNhdGVnb3JpZXMiLCJ1c2VNZWRpYVF1ZXJ5IiwiUG9zdFBhZ2UiLCJwb3N0IiwidCIsImkxOG4iLCJsYW5ndWFnZSIsImlzTGFwdG9wIiwibGFuZ3MiLCJ0ZXh0UnUiLCJ0ZXh0RW4iLCJ0ZXh0R2UiLCJjdXJyZW50TGFuZ1RleHQiLCJmaW5kIiwiZWwiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJsaW5rIiwicmVsIiwiaHJlZiIsImlzSGlkZVNlYXJjaCIsImlzSGlkZUNvdW50ZXIiLCJjbGFzc05hbWUiLCJjdXJyZW50UGF0aCIsImluY2x1ZGVzIiwidmFsdWUiLCJsYWJlbCIsImN1cnJlbnRMaW5rIiwiaW1hZ2VzIiwibGVuZ3RoIiwicHJpY2UiLCJjdXJyZW5jeSIsInRpbWUiLCJ1cGRhdGVkQXQiLCJwb3N0Q2F0ZWdvcmllcyIsImNpdHkiLCJhZGRyZXNzIiwiY29udGFjdHMiLCJpZCIsInRleHQiLCJwb3N0SWQiLCJ1c2VyUG9zdHMiLCJwb3N0cyIsInRvdGFsQ291bnQiLCJ1c2VyUG9zdHNDb3VudCIsInVzZXJJZCIsInVzZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/post/[id].tsx\n"));

/***/ })

});