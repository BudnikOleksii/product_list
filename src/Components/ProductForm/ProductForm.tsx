/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  FC, FormEvent, useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './productForm.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewProduct, updateProductById } from '../../features/productsSlice';
import { addNewCommentForProduct, removeComment } from '../../features/commentsSlice';

const defaultProduct = {
  imageUrl: '',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '0',
  comments: [] as Comment[],
};

export const ProductForm: FC = () => {
  const { productId = 0 } = useParams();

  const productState = useAppSelector(state => (
    state.productsState.products.find(product => String(product.id) === productId) || defaultProduct
  ));
  const comments = useAppSelector(state => (
    state.commentsState.comments[productId] || []
  ));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(productState);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState('');

  const isValidTextInput = (value: string) => {
    if (/[^a-zA-Z/:. ]/g.test(value) || value.length < 4) {
      setErrorMessage('Input text field should contain more than 4 characters and should be valid');

      return false;
    }

    return true;
  };

  const handleNewSizeData = (field: string, value: number) => {
    setErrorMessage('');

    setProduct(prevState => ({
      ...prevState,
      size: {
        ...prevState.size,
        [field]: value,
      },
    }));
  };

  const handleNewProductData = (field: string, value: string | number) => {
    setErrorMessage('');

    setProduct(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isValidForm = () => {
    return isValidTextInput(product.imageUrl) && isValidTextInput(product.name);
  };

  const handleAddNewProduct = (event: FormEvent) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    if (productId) {
      dispatch(updateProductById({
        ...product,
        id: productId,
      }));
    } else {
      dispatch(addNewProduct(product));
    }

    navigate('/');
  };

  const handleAddNewComment = (event: FormEvent) => {
    event.preventDefault();

    dispatch(addNewCommentForProduct({
      productId,
      description: newComment,
      date: new Date().toLocaleDateString(),
    }));

    setNewComment('');
  };

  return (
    <div className="form-block">
      <form className="form-block" onSubmit={handleAddNewProduct}>
        <Link
          className="button is-primary is-rounded m-2"
          to="/"
        >
          Return to dashboard
        </Link>

        {errorMessage && (
          <div className="notification  is-danger">
            {errorMessage}
          </div>
        )}

        <label className="field">
          ImageUrl:
          <input
            type="text"
            placeholder="ImageUrl"
            value={product.imageUrl}
            onChange={(event) => handleNewProductData('imageUrl', event.target.value)}
            required
            className="input"
          />
        </label>

        <label className="field">
          Name:
          <input
            type="text"
            placeholder="Name"
            value={product.name}
            onChange={(event) => handleNewProductData('name', event.target.value)}
            required
            className="input"
          />
        </label>

        <label className="field">
          Count:
          <input
            type="number"
            placeholder="Count"
            value={product.count}
            onChange={(event) => handleNewProductData('count', Number(event.target.value))}
            required
            min="1"
            className="input"
          />
        </label>

        <label className="field">
          Width:
          <input
            type="number"
            placeholder="Width"
            value={product.size.width}
            onChange={(event) => handleNewSizeData('width', Number(event.target.value))}
            required
            min="0"
            className="input"
          />
        </label>

        <label className="field">
          Height:
          <input
            type="number"
            placeholder="Height"
            value={product.size.height}
            onChange={(event) => handleNewSizeData('height', Number(event.target.value))}
            required
            min="0"
            className="input"
          />
        </label>

        <label className="field">
          Weight:
          <input
            type="number"
            placeholder="Weight"
            value={parseInt(product.weight, 10)}
            min="0"
            onChange={(event) => handleNewProductData('weight', `${event.target.value}g`)}
            required
            className="input"
          />
        </label>

        <button
          className="button is-primary"
          type="submit"
          disabled={!product.imageUrl || !product.name || !product.count || !product.weight
            || !product.size.width || !product.size.height}
        >
          {productId ? 'Edit a Product' : 'Add a Product'}
        </button>
      </form>

      {comments.length > 0 && (
        <div className="box">
          <h3 className="is-size-3">Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id} className="is-flex is-justify-content-space-between m-2">
                <p className="is-size-5">{comment.description}</p>
                <button
                  className="button is-danger"
                  type="button"
                  onClick={() => dispatch(removeComment(comment))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {productId > 0 && (
        <form className="form-block" onSubmit={handleAddNewComment}>
          <textarea
            className="textarea"
            placeholder="New Comment"
            value={newComment}
            onChange={(event => setNewComment(event.target.value))}
          >
          </textarea>
          <button
            className="button is-primary"
            type="submit"
            disabled={!newComment}
          >
            Add new comment
          </button>
        </form>
      )}
    </div>
  );
};
