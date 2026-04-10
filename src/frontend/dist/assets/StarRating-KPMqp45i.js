import { c as createLucideIcon, j as jsxRuntimeExports, a as cn } from "./index-BcEEdqxz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const sizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};
function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className
}) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial, index: i };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: stars.map(({ filled, partial, index }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: cn(sizes[size], "text-muted-foreground/30"),
          fill: "currentColor"
        }
      ),
      (filled || partial) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 overflow-hidden",
          style: { width: filled ? "100%" : `${rating % 1 * 100}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: cn(sizes[size], "text-accent"),
              fill: "currentColor"
            }
          )
        }
      )
    ] }, index)) }),
    reviewCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "(",
      reviewCount.toLocaleString(),
      ")"
    ] })
  ] });
}
export {
  StarRating as S,
  Star as a
};
