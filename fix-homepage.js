// Script to fix the homepage to show all original content
const fs = require('fs');
const path = require('path');

console.log('🏠 Fixing homepage to display all original content...');

const appPagePath = path.join('app', 'page.tsx');
const fullHomePage = `import Container from "@/app/components/Container";
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

// Write the full homepage content
fs.writeFileSync(appPagePath, fullHomePage);
console.log('✅ Homepage restored with all original content'); 