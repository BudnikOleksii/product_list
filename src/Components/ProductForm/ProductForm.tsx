import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

type Props = {
  currentProduct: Product;
};

export const ProductForm: FC<Props> = ({ currentProduct }) => {
  const {
    id, imageUrl, name, count, size, weight, comments,
  } = currentProduct;

  return (
    <tr data-cy="person">
      <td>
        <img src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{count}</td>
      <td>{`${size.width} * ${size.height}`}</td>
      <td>{weight}</td>
      <td>
        {comments}
      </td>
      <td>
        <div className="buttons">
          <Link className="button is-warning" to={`/product/edit/${id}`}>
            Edit
          </Link>
          <button
            type="button"
            className="button is-danger"
            onClick={() => {}}
          >
            {/* {isLoadingDelete */}
            {/*  ? <Loader /> */}
            {/*  : 'Delete'} */}
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
