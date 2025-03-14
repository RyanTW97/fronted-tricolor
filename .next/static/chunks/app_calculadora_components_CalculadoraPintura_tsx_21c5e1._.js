(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_calculadora_components_CalculadoraPintura_tsx_21c5e1._.js", {

"[project]/app/calculadora/components/CalculadoraPintura.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
// @ts-nocheck
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
const CalculadoraPintura = ()=>{
    _s();
    const [numberOfWalls, setNumberOfWalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [wallsDimensions, setWallsDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [paintNeeded, setPaintNeeded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const initializeWallDimensions = (num)=>{
        return Array(num).fill(null).map(()=>({
                height: null,
                width: null,
                area: null,
                locked: false
            }));
    };
    const handleNumberOfWallsChange = (e)=>{
        const value = parseInt(e.target.value, 10) || 0;
        setNumberOfWalls(value);
        setWallsDimensions(initializeWallDimensions(value));
    };
    const updateWallDimension = (index, field, value)=>{
        setWallsDimensions((prev)=>{
            const updatedWalls = [
                ...prev
            ];
            const wall = {
                ...updatedWalls[index],
                [field]: value
            };
            if (wall.height && wall.width) {
                wall.area = wall.height * wall.width;
                wall.locked = true;
            }
            updatedWalls[index] = wall;
            return updatedWalls;
        });
    };
    const unlockWall = (index)=>{
        setWallsDimensions((prev)=>{
            const updatedWalls = [
                ...prev
            ];
            updatedWalls[index] = {
                ...updatedWalls[index],
                area: null,
                locked: false
            };
            return updatedWalls;
        });
    };
    const calculatePaintNeeded = ()=>{
        const totalArea = wallsDimensions.reduce((sum, wall)=>sum + (wall.area || 0), 0);
        const paintCoveragePerLiter = 10; // 10 m² por litro
        setPaintNeeded(totalArea / paintCoveragePerLiter);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-lg mx-auto rounded-lg shadow-md",
        "data-theme": "retro",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "Calculadora de Pintura"
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "¿Cuántas paredes vas a pintar?"
                    }, void 0, false, {
                        fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        min: "1",
                        value: numberOfWalls ?? "",
                        onChange: handleNumberOfWallsChange,
                        className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            wallsDimensions.map((wall, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-2",
                            children: [
                                "Pared ",
                                index + 1
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-4 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-700 text-sm font-bold mb-1",
                                            children: "Altura (metros)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: wall.height ?? "",
                                            onChange: (e)=>updateWallDimension(index, "height", parseFloat(e.target.value) || 0),
                                            className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400",
                                            disabled: wall.locked
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-700 text-sm font-bold mb-1",
                                            children: "Ancho (metros)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: wall.width ?? "",
                                            onChange: (e)=>updateWallDimension(index, "width", parseFloat(e.target.value) || 0),
                                            className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400",
                                            disabled: wall.locked
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-1",
                                    children: "Área Total (m²)"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: wall.area ?? "",
                                            onChange: (e)=>updateWallDimension(index, "area", parseFloat(e.target.value) || 0),
                                            className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400",
                                            disabled: wall.locked
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 142,
                                            columnNumber: 15
                                        }, this),
                                        wall.locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>unlockWall(index),
                                            className: "bg-red-400 text-white px-2 py-1 rounded",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)),
            numberOfWalls && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: calculatePaintNeeded,
                className: "w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 focus:ring-2 focus:ring-blue-400",
                children: "Calcular cantidad de pintura"
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this),
            paintNeeded !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-4 bg-green-100 text-green-700 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Necesitarás aproximadamente",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: [
                                paintNeeded.toFixed(2),
                                " litros"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        " de pintura."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calculadora/components/CalculadoraPintura.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
};
_s(CalculadoraPintura, "NZggnoI/bCCju0op/wxNbI3uUqA=");
_c = CalculadoraPintura;
const __TURBOPACK__default__export__ = CalculadoraPintura;
var _c;
__turbopack_refresh__.register(_c, "CalculadoraPintura");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_calculadora_components_CalculadoraPintura_tsx_21c5e1._.js.map