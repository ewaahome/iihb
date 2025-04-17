// Script to restore the original homepage content
const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring original homepage content...');

// The full original homepage content
const originalHomePageContent = `import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import CitiesSection from "@/app/components/CitiesSection";
import Categories from "@/app/components/navbar/Categories";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

// إضافة خاصية revalidate لضمان تحديث البيانات
export const revalidate = 0;

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pb-10">
        <CitiesSection />
        <div className="pt-4">
          <Categories />
        </div>
      </div>
      <Container>
        <div 
          className="
            pt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;`;

// Path to the page.tsx file
const pagePath = path.join('app', 'page.tsx');

// Write the original content back to the file
try {
  fs.writeFileSync(pagePath, originalHomePageContent);
  console.log('✅ Original homepage content has been restored');
} catch (error) {
  console.error('❌ Error restoring homepage content:', error.message);
} 