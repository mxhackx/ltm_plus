(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/dws/ltm_plus/public/logo.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/logo.3odv7loxbbutk.png");}),
"[project]/dws/ltm_plus/public/logo.png.mjs { IMAGE => \"[project]/dws/ltm_plus/public/logo.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/dws/ltm_plus/public/logo.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1254,
    height: 1254,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA70lEQVR42k2KT0vDMByGf0mTtrb2X9KsW7uka2WygdvF2c3iJkF09qKoB0UUnIgXr34VwY9rdxj4wHN5nxeghRqIjmJ7opXTaLnXjBmdUIzotgHBiJxKb1313GYujNUsNupFQlfLHr0gCAiUoXk4l8FGhN7N64Hx+VDa31NhXd0W9nvhG0OoutZShs4l4/xLZ9bLecl/siz9HSbBx0mHnsFMkDr16FF72Cju3/Xj8CmKouecOfq4Y9bQd7FadK21YNG9FOxRJfyNhcF1lbo6dYkCjACXPhkz18rzyJkOWvm+PSgCc7RtsAMhhP+72/8A3ocbTKjhp9AAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dws/ltm_plus/src/components/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header,
    "getDarkLocaltorage",
    ()=>getDarkLocaltorage,
    "handleDark",
    ()=>handleDark,
    "handleDarkClick",
    ()=>handleDarkClick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/dws/ltm_plus/public/logo.png.mjs { IMAGE => "[project]/dws/ltm_plus/public/logo.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/shopping-cart.mjs [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/dws/ltm_plus/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function getDarkLocaltorage(data = "dark") {
    const darkStorage = localStorage.getItem(data);
    if (!darkStorage) return undefined;
    return darkStorage === "true" ? true : false;
}
const handleDark = (prev)=>{
    const next = prev;
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    return next;
};
const handleDarkClick = (setDark)=>setDark((prev)=>handleDark(!prev));
function Header() {
    _s();
    const [dark, setDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menu, setMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const links = [
        {
            name: "Accueil",
            href: "/"
        },
        {
            name: "Catalogue",
            href: "/catalog"
        },
        {
            name: "Panier",
            href: "/panier"
        },
        {
            name: "Contact",
            href: "/contact"
        },
        {
            name: "À propos",
            href: "/about"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const isDark = getDarkLocaltorage();
            if (isDark !== undefined) setDark({
                "Header.useEffect": (prev)=>handleDark(isDark)
            }["Header.useEffect"]);
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>localStorage.setItem("dark", dark ? "true" : "false")
    }["Header.useEffect"], [
        dark
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `sticky top-0 z-50 bg-[var(--orange)] shadow-lg font-mono`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                width: 40,
                                alt: "LTM+ logo",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded-full p-2 transition hover:bg-black/10",
                            onClick: ()=>handleDarkClick(setDark),
                            children: dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 64,
                                columnNumber: 40
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            className: "rounded-full p-2 transition hover:bg-black/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/catalog",
                            className: "rounded-full p-2 transition hover:bg-black/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMenu(true),
                            className: "rounded-full p-2 transition hover:bg-black/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                menu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>setMenu(false),
                    className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                }, void 0, false, {
                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                    lineNumber: 78,
                    columnNumber: 19
                }, this),
                menu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: `text-white fixed right-0 top-0 z-50 h-screen w-[320px] max-w-[90%] p-6 shadow-2xl transition-transform duration-1000 ${menu ? "translate-x-0" : "translate-x-7"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$dws$2f$ltm_plus$2f$public$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                    width: 55,
                                    alt: "LTM+ logo"
                                }, void 0, false, {
                                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMenu(false),
                                    className: "rounded-full p-2 hover:bg-black/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                        fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    onClick: ()=>setMenu(false),
                                    className: " flex items-center justify-between rounded-xl bg-white/20 px-4 py-3 transition hover:bg-white/30 ",
                                    children: [
                                        link.name,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, link.href, true, {
                                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-10 left-6 right-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/contact",
                                className: " flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-white dark:text-black py-3 text-white ",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dws$2f$ltm_plus$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    "Nous contacter"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
                    lineNumber: 79,
                    columnNumber: 18
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/dws/ltm_plus/src/components/header.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(Header, "jqSEaGs8T/Pj/t9fx/rGXW08emc=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=dws_ltm_plus_0qaqygs._.js.map