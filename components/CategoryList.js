import React from "react";
import { db } from "../utils/firebase";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const collectionRef = collection(db, "urls");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resultArr = querySnapshot.docs.map((doc) => doc.data().category);

      setCategories(
        resultArr.filter((item, pos) => resultArr.indexOf(item) == pos)
      );
    });

    return unsubscribe;
  }, []);

  const onSelectCategory = (category) => {
    const q = query(collectionRef, where("category", "==", category));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resultArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      console.log(resultArr);
    });
  };

  return (
    <div>
      {categories.map((category, id) => (
        <div key={id}>
          {category}
          <button onClick={() => onSelectCategory(category)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
