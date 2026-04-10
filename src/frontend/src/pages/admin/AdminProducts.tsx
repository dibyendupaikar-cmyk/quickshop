import { ExternalBlob } from "@/backend";
import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useBackend";
import type { Category, Product } from "@/types/index";
import {
  ImageIcon,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  category: Category;
  stockCount: string;
  imageFile: File | null;
  imagePreview: string;
}

const EMPTY_FORM: ProductFormState = {
  name: "",
  description: "",
  price: "",
  category: "clothing",
  stockCount: "10",
  imageFile: null,
  imagePreview: "",
};

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"];

export default function AdminProducts() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Category | "all">("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = (products ?? []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setUploadProgress(0);
    setAddOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditTarget(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      stockCount: String(
        (product as unknown as { stockCount?: number }).stockCount ?? 10,
      ),
      imageFile: null,
      imagePreview: product.imageUrl,
    });
    setUploadProgress(0);
  };

  const buildBlob = async (): Promise<ExternalBlob> => {
    if (form.imageFile) {
      const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
      return ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
    }
    if (form.imagePreview) {
      return ExternalBlob.fromURL(form.imagePreview);
    }
    return ExternalBlob.fromURL("");
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Product name is required");
    if (!form.price || Number(form.price) <= 0)
      return toast.error("Enter a valid price");

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
      image: blob,
    };

    if (editTarget) {
      updateProduct.mutate(
        { ...payload, id: editTarget.id } as unknown as Product,
        {
          onSuccess: () => {
            toast.success("Product updated");
            setEditTarget(null);
          },
          onError: () => toast.error("Failed to update product"),
        },
      );
    } else {
      createProduct.mutate(payload as unknown as Omit<Product, "id">, {
        onSuccess: () => {
          toast.success("Product created");
          setAddOpen(false);
          setForm(EMPTY_FORM);
        },
        onError: () => toast.error("Failed to create product"),
      });
    }
  };

  const handleDelete = (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    deleteProduct.mutate(product.id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: () => toast.error("Failed to delete product"),
    });
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  const ProductForm = () => (
    <div className="space-y-4 pt-2">
      {/* Image upload */}
      <div>
        <Label>Product Image</Label>
        <button
          type="button"
          className="mt-1.5 border-2 border-dashed border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-smooth w-full text-left"
          onClick={() => fileRef.current?.click()}
          aria-label="Upload product image"
        >
          {form.imagePreview ? (
            <div className="relative">
              <img
                src={form.imagePreview}
                alt="Preview"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-smooth">
                <Upload className="w-6 h-6 text-card" />
              </div>
            </div>
          ) : (
            <div className="h-28 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="w-8 h-8 opacity-40" />
              <p className="text-xs">Click to upload image</p>
            </div>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          data-ocid="product-image-input"
        />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="product-name">Name</Label>
        <Input
          id="product-name"
          placeholder="Wireless Headphones"
          className="mt-1.5"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          data-ocid="admin-product-name"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="product-desc">Description</Label>
        <Textarea
          id="product-desc"
          placeholder="Product description…"
          className="mt-1.5 resize-none"
          rows={2}
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          data-ocid="admin-product-desc"
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="product-price">Price (₹)</Label>
          <Input
            id="product-price"
            type="number"
            placeholder="499"
            className="mt-1.5"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            data-ocid="admin-product-price"
          />
        </div>
        <div>
          <Label htmlFor="product-stock">Stock</Label>
          <Input
            id="product-stock"
            type="number"
            placeholder="10"
            className="mt-1.5"
            value={form.stockCount}
            onChange={(e) =>
              setForm((f) => ({ ...f, stockCount: e.target.value }))
            }
            data-ocid="admin-product-stock"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="product-category">Category</Label>
        <Select
          value={form.category}
          onValueChange={(v) =>
            setForm((f) => ({ ...f, category: v as Category }))
          }
        >
          <SelectTrigger
            id="product-category"
            className="mt-1.5"
            data-ocid="admin-product-category"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="food">Food</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={isPending}
        data-ocid="save-product-btn"
      >
        {isPending ? "Saving…" : editTarget ? "Update Product" : "Add Product"}
      </Button>
    </div>
  );

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Products"
        description="Manage your store's product catalog"
      >
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-3 flex-1 min-w-0">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="admin-product-search"
              />
            </div>
            <Select
              value={filterCat}
              onValueChange={(v) => setFilterCat(v as Category | "all")}
            >
              <SelectTrigger className="w-44" data-ocid="admin-product-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add product dialog */}
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openAdd} data-ocid="add-product-btn">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit product dialog */}
        <Dialog
          open={!!editTarget}
          onOpenChange={(v) => !v && setEditTarget(null)}
        >
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-3">
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="bg-card border border-border rounded-xl py-16 text-center"
            data-ocid="empty-products"
          >
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-foreground mb-1">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              {search || filterCat !== "all"
                ? "Try adjusting your filters."
                : "Add your first product above."}
            </p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">
                    Price
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Stock
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                    data-ocid="admin-product-row"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-border bg-muted shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-foreground whitespace-nowrap">
                      ₹{product.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        className={
                          product.inStock
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs"
                            : "bg-destructive/15 text-destructive text-xs"
                        }
                      >
                        {product.inStock ? "In Stock" : "Out"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openEdit(product)}
                          aria-label={`Edit ${product.name}`}
                          data-ocid="edit-product-btn"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(product)}
                          aria-label={`Delete ${product.name}`}
                          data-ocid="delete-product-btn"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
