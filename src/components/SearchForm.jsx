import { useDispatch, useSelector } from 'react-redux'
import { searchBrands, setNumber } from '../store/partsSlice'

export function SearchForm() {
  const dispatch = useDispatch()
  const { number, brandsLoading } = useSelector((state) => state.parts)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!number.trim() || brandsLoading) return
    dispatch(searchBrands(number))
  }

  return (
    <form className="row g-2 align-items-end" onSubmit={onSubmit}>
      <div className="col-md-8">
        <label htmlFor="article" className="form-label">
          Артикул запчасти
        </label>
        <input
          id="article"
          className="form-control"
          value={number}
          onChange={(e) => dispatch(setNumber(e.target.value))}
          placeholder="Например 0986494058"
          disabled={brandsLoading}
        />
      </div>
      <div className="col-md-4">
        <button className="btn btn-primary w-100" type="submit" disabled={brandsLoading || !number.trim()}>
          {brandsLoading ? 'Ищем…' : 'Найти производителей'}
        </button>
      </div>
    </form>
  )
}
