"use strict";
exports.id = 63;
exports.ids = [63];
exports.modules = {

/***/ 7063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Dj": () => (/* reexport */ persistor),
  "h": () => (/* reexport */ store),
  "bO": () => (/* reexport */ useStoreDispatch),
  "US": () => (/* reexport */ useStoreSelector)
});

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(6695);
// EXTERNAL MODULE: ./lib/redux/reducers/user.ts
var user = __webpack_require__(89);
;// CONCATENATED MODULE: ./lib/redux/reducers.ts


/* harmony default export */ const reducers = ((0,external_redux_.combineReducers)({
    user: user/* default */.Z
}));

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "redux-persist"
var external_redux_persist_ = __webpack_require__(4161);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "redux-persist/lib/storage"
var storage_ = __webpack_require__(8936);
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_);
;// CONCATENATED MODULE: ./lib/redux/store.ts





const persistConfig = {
    key: "root",
    storage: (storage_default())
};
const persistedReducer = (0,external_redux_persist_.persistReducer)(persistConfig, reducers);
const store = (0,toolkit_.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    external_redux_persist_.FLUSH,
                    external_redux_persist_.REHYDRATE,
                    external_redux_persist_.PAUSE,
                    external_redux_persist_.PERSIST,
                    external_redux_persist_.PURGE,
                    external_redux_persist_.REGISTER, 
                ]
            }
        })
});
const persistor = (0,external_redux_persist_.persistStore)(store);
const useStoreDispatch = ()=>(0,external_react_redux_.useDispatch)();
const useStoreSelector = external_react_redux_.useSelector;

;// CONCATENATED MODULE: ./lib/redux/index.ts




/***/ }),

/***/ 89:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ updateUser),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = null;
const user = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "user",
    initialState,
    reducers: {
        updateUser (state, action) {
            state = action.payload;
            return state;
        }
    }
});
const { updateUser  } = user.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user.reducer);


/***/ })

};
;