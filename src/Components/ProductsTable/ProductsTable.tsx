import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductComponent } from '../ProductComponent';

type Props = {
  products: Product[];
};

export const ProductsTable: FC<Props> = ({ products }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Image', 'Name', 'Count', 'Size', 'Weight', 'Comments', 'Actions'].map(head => (
            <th key={head}>
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <ProductComponent currentProduct={product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
};
