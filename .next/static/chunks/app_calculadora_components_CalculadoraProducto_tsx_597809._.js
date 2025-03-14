(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_calculadora_components_CalculadoraProducto_tsx_597809._.js", {

"[project]/app/calculadora/components/CalculadoraProducto.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>CalculadoraProducto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
// Lista de superficies con un único producto asignado
const surfaces = [
    {
        name: "Madera",
        product: "Producto 1"
    },
    {
        name: "Metal",
        product: "Producto 2"
    },
    {
        name: "Concreto",
        product: "Producto 3"
    },
    {
        name: "Cerámica",
        product: "Producto 4"
    },
    {
        name: "Plástico",
        product: "Producto 5"
    },
    {
        name: "Vidrio",
        product: "Producto 6"
    },
    {
        name: "Yeso",
        product: "Producto 7"
    },
    {
        name: "Ladrillo",
        product: "Producto 8"
    }
];
function CalculadoraProducto() {
    _s();
    const [selectedSurface, setSelectedSurface] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [recommendedProduct, setRecommendedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSurfaceChange = (surfaceName)=>{
        setSelectedSurface(surfaceName);
        const surface = surfaces.find((s)=>s.name === surfaceName);
        setRecommendedProduct(surface?.product || "");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-theme": "retro",
        className: "p-6  rounded-md shadow-md max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold mb-4",
                children: "Calculadora de Producto"
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-gray-700 font-medium mb-2",
                children: "Selecciona la superficie:"
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "w-full p-2 border rounded-md",
                value: selectedSurface,
                onChange: (e)=>handleSurfaceChange(e.target.value),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        disabled: true,
                        children: "-- Selecciona una opción --"
                    }, void 0, false, {
                        fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    surfaces.map((surface)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: surface.name,
                            children: surface.name
                        }, surface.name, false, {
                            fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            recommendedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Producto recomendado:"
                    }, void 0, false, {
                        fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-gray-700",
                        children: recommendedProduct
                    }, void 0, false, {
                        fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            selectedSurface && !recommendedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-6 text-red-500",
                children: "No hay producto recomendado para esta superficie."
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calculadora/components/CalculadoraProducto.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(CalculadoraProducto, "l2axLn+gW6+nonCU0+H5W41QVrQ=");
_c = CalculadoraProducto;
var _c;
__turbopack_refresh__.register(_c, "CalculadoraProducto");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_calculadora_components_CalculadoraProducto_tsx_597809._.js.map