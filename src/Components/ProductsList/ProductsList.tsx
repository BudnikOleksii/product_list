import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsTable } from '../ProductsTable';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectors } from '../../app/store';
import { fetchProducts } from '../../features/productsSlice';
import { Loader } from '../Loader';

export const ProductsList: FC = () => {
  const dispatch = useAppDispatch();
  const { products, productsError, productsIsLoading } = useAppSelector(selectors.getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <h1 className="is-size-1 m-4 has-text-centered has-text-primary">Products List</h1>
      <div className="block">
        <div className="box table-container">
          {productsError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!productsError && (
            <div
              className="inputs-block is-flex is-flex-direction-column m-auto"
              style={{ maxWidth: '300px' }}
            >
              <Link
                className="button is-primary is-rounded m-2"
                to="/books/edit"
              >
                Add a new product
              </Link>
            </div>
          )}

          {!productsError && products.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no products on the server
            </p>
          )}

          {productsIsLoading && <Loader />}

          {products.length > 0 && <ProductsTable products={products} />}
        </div>
      </div>
    </>
  );
};
