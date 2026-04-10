import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as Button, B as Badge } from "./index-BcEEdqxz.js";
import { u as useProducts, k as useCreateProduct, l as useUpdateProduct, m as useDeleteProduct, E as ExternalBlob } from "./useBackend-5NC4LJso.js";
import { A as AdminLayout } from "./AdminLayout-edk7lyGW.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-Clsxl5pK.js";
import { I as Input } from "./input-BuzKrnlF.js";
import { L as Label } from "./label-BjMx4jys.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3nHbQU75.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { T as Textarea } from "./textarea-Ib6gRL0p.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { S as Search } from "./search-CjA6Wj5V.js";
import { P as Plus } from "./plus-BhGbtoFf.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { T as Trash2 } from "./trash-2-LeF-WNHH.js";
import "./tag-DRXBsinr.js";
import "./index-CSz3IhE1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "clothing",
  stockCount: "10",
  imageFile: null,
  imagePreview: ""
};
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"];
function AdminProducts() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [search, setSearch] = reactExports.useState("");
  const [filterCat, setFilterCat] = reactExports.useState("all");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileRef = reactExports.useRef(null);
  const filtered = (products ?? []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      imageFile: file,
      imagePreview: URL.createObjectURL(file)
    }));
  };
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setUploadProgress(0);
    setAddOpen(true);
  };
  const openEdit = (product) => {
    setEditTarget(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      stockCount: String(
        product.stockCount ?? 10
      ),
      imageFile: null,
      imagePreview: product.imageUrl
    });
    setUploadProgress(0);
  };
  const buildBlob = async () => {
    if (form.imageFile) {
      const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
      return ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(pct)
      );
    }
    if (form.imagePreview) {
      return ExternalBlob.fromURL(form.imagePreview);
    }
    return ExternalBlob.fromURL("");
  };
  const handleSave = async () => {
    if (!form.name.trim()) return ue.error("Product name is required");
    if (!form.price || Number(form.price) <= 0)
      return ue.error("Enter a valid price");
    const blob = await buildBlob();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      stockCount: Number(form.stockCount) || 0,
      imageUrl: blob.getDirectURL(),
      inStock: Number(form.stockCount) > 0,
      rating: 0,
      reviewCount: 0,
      image: blob
    };
    if (editTarget) {
      updateProduct.mutate(
        { ...payload, id: editTarget.id },
        {
          onSuccess: () => {
            ue.success("Product updated");
            setEditTarget(null);
          },
          onError: () => ue.error("Failed to update product")
        }
      );
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => {
          ue.success("Product created");
          setAddOpen(false);
          setForm(EMPTY_FORM);
        },
        onError: () => ue.error("Failed to create product")
      });
    }
  };
  const handleDelete = (product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    deleteProduct.mutate(product.id, {
      onSuccess: () => ue.success("Product deleted"),
      onError: () => ue.error("Failed to delete product")
    });
  };
  const isPending = createProduct.isPending || updateProduct.isPending;
  const ProductForm = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "mt-1.5 border-2 border-dashed border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-smooth w-full text-left",
          onClick: () => {
            var _a;
            return (_a = fileRef.current) == null ? void 0 : _a.click();
          },
          "aria-label": "Upload product image",
          children: form.imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: form.imagePreview,
                alt: "Preview",
                className: "w-full h-36 object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-card" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-28 flex flex-col items-center justify-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Click to upload image" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleFileChange,
          "data-ocid": "product-image-input"
        }
      ),
      uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary transition-all duration-200",
          style: { width: `${uploadProgress}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-name", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "product-name",
          placeholder: "Wireless Headphones",
          className: "mt-1.5",
          value: form.name,
          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
          "data-ocid": "admin-product-name"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-desc", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "product-desc",
          placeholder: "Product description…",
          className: "mt-1.5 resize-none",
          rows: 2,
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
          "data-ocid": "admin-product-desc"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-price", children: "Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "product-price",
            type: "number",
            placeholder: "499",
            className: "mt-1.5",
            value: form.price,
            onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
            "data-ocid": "admin-product-price"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-stock", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "product-stock",
            type: "number",
            placeholder: "10",
            className: "mt-1.5",
            value: form.stockCount,
            onChange: (e) => setForm((f) => ({ ...f, stockCount: e.target.value })),
            "data-ocid": "admin-product-stock"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-category", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.category,
          onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "product-category",
                className: "mt-1.5",
                "data-ocid": "admin-product-category",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "clothing", children: "Clothing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "electronics", children: "Electronics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "food", children: "Food" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full",
        onClick: handleSave,
        disabled: isPending,
        "data-ocid": "save-product-btn",
        children: isPending ? "Saving…" : editTarget ? "Update Product" : "Add Product"
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminLayout,
    {
      title: "Products",
      description: "Manage your store's product catalog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search products…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9",
                  "data-ocid": "admin-product-search"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filterCat,
                onValueChange: (v) => setFilterCat(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "admin-product-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "clothing", children: "Clothing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "electronics", children: "Electronics" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "food", children: "Food" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: openAdd, "data-ocid": "add-product-btn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Add Product"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[90vh] overflow-y-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Product" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, {})
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!editTarget,
            onOpenChange: (v) => !v && setEditTarget(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[90vh] overflow-y-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Product" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, {})
            ] })
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl py-16 text-center",
            "data-ocid": "empty-products",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No products found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: search || filterCat !== "all" ? "Try adjusting your filters." : "Add your first product above." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[560px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-foreground", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
              "data-ocid": "admin-product-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imageUrl,
                      alt: product.name,
                      className: "w-10 h-10 rounded-lg object-cover border border-border bg-muted shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground line-clamp-1", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-0.5", children: product.description })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize text-xs", children: product.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-bold text-foreground whitespace-nowrap", children: [
                  "₹",
                  product.price.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: product.inStock ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs" : "bg-destructive/15 text-destructive text-xs",
                    children: product.inStock ? "In Stock" : "Out"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-8 w-8 p-0",
                      onClick: () => openEdit(product),
                      "aria-label": `Edit ${product.name}`,
                      "data-ocid": "edit-product-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => handleDelete(product),
                      "aria-label": `Delete ${product.name}`,
                      "data-ocid": "delete-product-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) })
              ]
            },
            product.id
          )) })
        ] }) })
      ]
    }
  ) });
}
export {
  AdminProducts as default
};
