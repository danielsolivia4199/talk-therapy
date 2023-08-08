// import { useState } from 'react';

function Home() {
  // const [categories, setCategories] = useState([]);

  // const getAllCategories = () => {
  //   getCategories().then(setCategories);
  // };

  // useEffect(() => {
  //   getAllCategories();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          margin: '0 auto',
        }}
      >
        <img src="https://greenane.ie/wp-content/uploads/2021/08/Adolescent-Trauma.png" alt="therapy" />

      </div>
      {/* <div id="category-section" className="text-center my-4 d-flex">
        {categories.map((category) => (
          <CategoryCard key={category.id} id={category.id} label={category.label} categoryObj={category} onUpdate={getAllCategories} />
        ))}
      </div> */}
    </>
  );
}

export default Home;
