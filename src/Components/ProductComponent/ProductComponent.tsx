import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectors } from '../../app/store';
import { fetchComments } from '../../features/commentsSlice';
import { Loader } from '../Loader';

type Props = {
  currentProduct: Product;
};

export const ProductComponent: FC<Props> = ({ currentProduct }) => {
  const {
    id, imageUrl, name, count, size, weight,
  } = currentProduct;

  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => (
    state.commentsState.comments[id] || []
  ));
  const {
    commentsIsLoading,
  } = useAppSelector(selectors.getComments);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  return (
    <tr>
      <td>
        <img src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{count}</td>
      <td>{`${size.width} * ${size.height}`}</td>
      <td>{weight}</td>
      <td>
        {commentsIsLoading
          ? <Loader />
          : (
            <ul>
              {comments.map(comment => <li key={comment.id}>{comment.description}</li>)}
            </ul>
          )}
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
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
