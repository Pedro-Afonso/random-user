import { BasicLayout } from '@/layouts'
import {
  CardList,
  Footer,
  Header,
  FilterList,
  ListingTool,
  SortSelect,
  PageLimitSelect,
  Subtitle
} from '@/components'

export default function Home() {
  return (
    <>
      <Header />
      <BasicLayout
        title="Usuários aleatórios"
        subtitle={<Subtitle />}
        filterList={<FilterList />}
        listingTool={
          <ListingTool
            selectPrimary={<SortSelect />}
            selectSecondary={<PageLimitSelect />}
          />
        }
      >
        <CardList />
      </BasicLayout>
      <Footer />
    </>
  )
}
