import { SearchForm } from './components/SearchForm'
import { BrandList } from './components/BrandList'
import { OffersTable } from './components/OffersTable'
import { StatusMessages } from './components/StatusMessages'

export default function App() {
  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h1 className="h3 mb-1">Подбор автозапчастей</h1>
      <p className="text-muted mb-4">
        Этап 1: поиск производителей по артикулу. Этап 2: аналоги и предложения по бренду.
      </p>

      <SearchForm />
      <StatusMessages />
      <BrandList />
      <OffersTable />
    </div>
  )
}
