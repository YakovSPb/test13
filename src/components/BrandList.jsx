import { useDispatch, useSelector } from 'react-redux'
import { loadOffers } from '../store/partsSlice'

export function BrandList() {
  const dispatch = useDispatch()
  const { brands, number, selectedBrand, brandsLoading, offersLoading } = useSelector(
    (state) => state.parts,
  )

  if (brandsLoading || brands.length === 0) return null

  return (
    <div className="mt-4">
      <h2 className="h5">Производители</h2>
      <div className="list-group">
        {brands.map((item) => (
          <button
            key={item.brand}
            type="button"
            className={`list-group-item list-group-item-action ${
              selectedBrand === item.brand ? 'active' : ''
            }`}
            disabled={offersLoading}
            onClick={() => dispatch(loadOffers({ number, brand: item.brand }))}
          >
            <strong>{item.brand}</strong>
            {item.name ? <span className="ms-2 opacity-75">{item.name}</span> : null}
          </button>
        ))}
      </div>
    </div>
  )
}
