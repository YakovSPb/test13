import { useSelector } from 'react-redux'

function formatPrice(price) {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return '—'
  }
  return `${Number(price).toLocaleString('ru-RU')} ₽`
}

export function OffersTable() {
  const { offers, selectedBrand, offersLoading } = useSelector((state) => state.parts)

  if (offersLoading) {
    return (
      <div className="mt-4 d-flex align-items-center gap-2">
        <div className="spinner-border spinner-border-sm" role="status" />
        <span>Загружаем аналоги и предложения…</span>
      </div>
    )
  }

  if (!selectedBrand || offers.length === 0) return null

  return (
    <div className="mt-4">
      <h2 className="h5">Аналоги и предложения: {selectedBrand}</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Название / производитель</th>
              <th>Цена</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((row, index) => (
              <tr key={`${row.brand}-${row.name}-${index}`}>
                <td>
                  <div>{row.name}</div>
                  <small className="text-muted">{row.brand}</small>
                </td>
                <td>{formatPrice(row.price)}</td>
                <td>{row.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
