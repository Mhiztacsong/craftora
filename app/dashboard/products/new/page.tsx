import NewProductForm from '@/app/ui/new-product-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default function NewProductPage() {
  return (
    <div className="max-w-xl">

      {/* BREADCRUMBS */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'New Product',
            href: '/dashboard/products/new',
            active: true,
          },
        ]}
      />

      {/* FORM */}
      <NewProductForm />
    </div>
  );
}