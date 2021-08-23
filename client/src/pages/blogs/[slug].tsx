import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../../components/global/Loading";
import CardVert from "../../components/cards/CardVert";
import Pagination from "../../components/global/Pagination";

import { getBlogsByCategoryId } from "../../redux/actions/blogAction";

import { RootStore, IParams, IBlog } from "../../utils/TypeScript";

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams<IParams>();
  const { search } = history.location;

  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every((item: { id: string }) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search));
    } else {
      const data = blogsCategory.find(
        (item: { id: string }) => item.id === categoryId
      );
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);

      if (data.search) history.push(data.search);
    }
  }, [categoryId, blogsCategory, dispatch, search, history]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategoryId(categoryId, search));
  };

  if (!blogs) return <Loading />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  );
};

export default BlogsByCategory;
