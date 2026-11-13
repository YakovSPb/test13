import { useSelector } from 'react-redux'
import { hasApiKey } from '../api/favoritApi'

export function StatusMessages() {
  const { brandsLoading, brandsError, offersError } = useSelector((state) => state.parts)

  return (
    <div className="mt-3">
      {!hasApiKey() && (
        <div className="alert alert-warning py-2">
          Ключ API не задан. Сейчас работают моки. Вставь ключ в <code>src/config.js</code> или
          переменную <code>VITE_API_KEY</code>.
        </div>
      )}

      {brandsLoading && (
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className="spinner-border spinner-border-sm" role="status" />
          <span>Ищем производителей…</span>
        </div>
      )}

      {brandsError && <div className="alert alert-danger py-2">{brandsError}</div>}
      {offersError && <div className="alert alert-danger py-2">{offersError}</div>}
    </div>
  )
}
