import { notFound } from 'next/navigation';
import { fromBrandSlug } from '@/helpers/brandSlug';
import Image from 'next/image';

export const revalidate = 60;

export default async function BrandPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const brandName = fromBrandSlug(params.slug);

  const res = await fetch(
    `https://born.topbon.us/end/fetch/one_brand.php?casino_brand=${encodeURIComponent(brandName)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) notFound();
  const brand = await res.json();
  if (brand.error) notFound();

  return (
    <section className="team s2" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-12">
            <div className="block-text center">
              <h3 className="heading">{brand.casino_brand}</h3>
              {brand.brand_logo && (
                <div style={{ margin: '30px auto', textAlign: 'center' }}>
                  <Image
                    src={`/images/${brand.brand_logo}.png`}
                    alt={brand.casino_brand}
                    width={300}
                    height={150}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
