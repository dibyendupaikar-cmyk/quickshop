import { c as createLucideIcon, r as reactExports, h as useComposedRefs, i as useControllableState, j as jsxRuntimeExports, k as Primitive, l as composeEventHandlers, m as useSize, n as createContextScope, a as cn, d as Button, B as Badge } from "./index-BcEEdqxz.js";
import { A as AdminLayout } from "./AdminLayout-edk7lyGW.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-Clsxl5pK.js";
import { I as Input } from "./input-BuzKrnlF.js";
import { L as Label } from "./label-BjMx4jys.js";
import { u as usePrevious, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3nHbQU75.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { o as useCoupons, p as useCreateCoupon, q as useDeleteCoupon } from "./useBackend-5NC4LJso.js";
import { u as useForm, C as Controller } from "./index.esm-CsoE6wew.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { P as Plus } from "./plus-BhGbtoFf.js";
import { T as Tag } from "./tag-DRXBsinr.js";
import { T as Trash2 } from "./trash-2-LeF-WNHH.js";
import "./shopping-bag-CQzdUjou.js";
import "./index-CSz3IhE1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c"];
function AdminCoupons() {
  const { data: coupons, isLoading } = useCoupons();
  const createCoupon = useCreateCoupon();
  const deleteCoupon = useDeleteCoupon();
  const [open, setOpen] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      discountType: "percentage",
      isActive: true,
      maxUses: 100,
      minOrderAmount: 0
    }
  });
  const onSubmit = (data) => {
    const payload = {
      ...data,
      code: data.code.toUpperCase(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt).getTime() : Date.now() + 30 * 24 * 60 * 60 * 1e3
    };
    createCoupon.mutate(payload, {
      onSuccess: () => {
        ue.success("Coupon created successfully");
        reset();
        setOpen(false);
      },
      onError: () => ue.error("Failed to create coupon")
    });
  };
  const handleDelete = (coupon) => {
    if (!confirm(`Delete coupon "${coupon.code}"? This cannot be undone.`))
      return;
    deleteCoupon.mutate(coupon.code, {
      onSuccess: () => ue.success("Coupon deleted"),
      onError: () => ue.error("Failed to delete coupon")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminLayout,
    {
      title: "Coupons",
      description: "Manage discount codes and promotions",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (coupons == null ? void 0 : coupons.length) ?? 0,
            " coupon",
            (coupons == null ? void 0 : coupons.length) !== 1 ? "s" : "",
            " ",
            "total"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", "data-ocid": "add-coupon-btn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "New Coupon"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create Coupon" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit(onSubmit),
                  className: "space-y-4 pt-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-code", children: "Coupon Code" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "coupon-code",
                          placeholder: "SAVE20",
                          className: "mt-1.5 uppercase tracking-wider font-mono",
                          ...register("code", {
                            required: "Coupon code is required"
                          }),
                          "data-ocid": "coupon-code-input"
                        }
                      ),
                      errors.code && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.code.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-type", children: "Discount Type" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Controller,
                          {
                            control,
                            name: "discountType",
                            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Select,
                              {
                                value: field.value,
                                onValueChange: field.onChange,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    SelectTrigger,
                                    {
                                      id: "coupon-type",
                                      className: "mt-1.5",
                                      "data-ocid": "coupon-type-select",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "percentage", children: "Percentage (%)" }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fixed", children: "Fixed Amount (₹)" })
                                  ] })
                                ]
                              }
                            )
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-value", children: "Value" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "coupon-value",
                            type: "number",
                            placeholder: "20",
                            className: "mt-1.5",
                            ...register("discountValue", {
                              required: "Value is required",
                              min: { value: 1, message: "Must be at least 1" }
                            }),
                            "data-ocid": "coupon-value-input"
                          }
                        ),
                        errors.discountValue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.discountValue.message })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-min", children: "Min Order (₹)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "coupon-min",
                            type: "number",
                            placeholder: "0",
                            className: "mt-1.5",
                            ...register("minOrderAmount", { min: 0 })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-max-uses", children: "Max Uses" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "coupon-max-uses",
                            type: "number",
                            placeholder: "100",
                            className: "mt-1.5",
                            ...register("maxUses", { min: 1 }),
                            "data-ocid": "coupon-max-uses-input"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-expiry", children: "Expiry Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "coupon-expiry",
                          type: "date",
                          className: "mt-1.5",
                          ...register("expiresAt"),
                          "data-ocid": "coupon-expiry-input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coupon-active", className: "cursor-pointer", children: "Active" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Coupon can be used by customers" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Controller,
                        {
                          control,
                          name: "isActive",
                          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Switch,
                            {
                              id: "coupon-active",
                              checked: field.value,
                              onCheckedChange: field.onChange,
                              "data-ocid": "coupon-active-toggle"
                            }
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "w-full",
                        disabled: createCoupon.isPending,
                        "data-ocid": "create-coupon-submit",
                        children: createCoupon.isPending ? "Creating…" : "Create Coupon"
                      }
                    )
                  ]
                }
              )
            ] })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }, k)) }) : !(coupons == null ? void 0 : coupons.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl py-16 text-center",
            "data-ocid": "empty-coupons",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No coupons yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first discount coupon to boost sales." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: coupons.map((coupon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-product",
            "data-ocid": "coupon-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono font-bold text-base text-foreground tracking-wider bg-muted px-2 py-1 rounded-md", children: coupon.code }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: coupon.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs" : "bg-muted text-muted-foreground text-xs",
                      children: coupon.isActive ? "Active" : "Inactive"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => handleDelete(coupon),
                      "aria-label": `Delete coupon ${coupon.code}`,
                      "data-ocid": "delete-coupon-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                coupon.discountType === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-4 h-4 text-primary shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: coupon.discountType === "percentage" ? `${coupon.discountValue}% off` : `₹${coupon.discountValue} off` }),
                coupon.minOrderAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                  "· min ₹",
                  coupon.minOrderAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Used:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: coupon.usedCount }),
                  "/",
                  coupon.maxUses
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(coupon.expiresAt).toLocaleDateString("en-IN") })
                ] })
              ] })
            ]
          },
          coupon.id
        )) })
      ]
    }
  ) });
}
export {
  AdminCoupons as default
};
