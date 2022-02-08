import { db } from "../utils/firebase";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  startAt,
  endAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch, FaChevronRight } from "react-icons/fa";
import moment from "moment";

const LoadingSkeleton = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UrlList = () => {
  const collectionRef = collection(db, "urls");

  const [urls, setUrls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [keyword, setKeyword] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseVideoId = (url) => {
    console.log(url);
    const parseUrl = url.split("?");

    const parsedQuery = parseUrl[1].split("&");

    const parsedVideoId = parsedQuery[0].split("=");

    return parsedVideoId[1];
  };

  const onSelectCategories = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // Fetch Categories of videos
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

  // Fetch Videos on specific queries
  useEffect(() => {
    setIsLoading(true);
    let q;
    if (selectedCategory === "All") {
      if (!keyword) {
        q = query(collectionRef, orderBy("timestamp", "desc"));
      } else {
        q = query(
          collectionRef,
          where("title", ">=", keyword),
          where("title", "<=", keyword + "\uf88f")
        );
      }
    } else {
      if (!keyword || keyword === "") {
        q = query(collectionRef, where("category", "==", selectedCategory));
      } else {
        q = query(
          collectionRef,
          where("category", "==", selectedCategory),
          where("title", ">=", keyword),
          where("title", "<=", keyword + "\uf88f")
        );
      }
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUrls(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    setIsLoading(false);
    return unsubscribe;
  }, [keyword, selectedCategory]);

  const onClickVideo = (link) => {
    location.href = link;
  };

  if (isLoading) {
    return (
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        H
      </svg>
    );
  }

  return (
    <>
      <div className="flex w-full h-full items-center bg-gray-100 rounded-md mb-4">
        <select
          className="w-24 h-12 bg-gray-100 px-2"
          onChange={onSelectCategories}
        >
          <option>All</option>
          {categories.map((category, id) => (
            <option key={id} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Seach Videos..."
          onChange={onChangeKeyword}
          value={keyword}
          className="ml-4 px-2 w-full h-12 bg-gray-100"
        />
        <FaSearch className="mx-4 text-gray-600 text-xl" />
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : urls.length === 0 ? (
        <div className="my-4 text-lg text-gray-500">
          {" "}
          No results with keyword {keyword}
        </div>
      ) : (
        urls.map((url) => (
          <div
            className="flex justify-between py-4 w-full cursor-pointer hover:bg-gray-100 focus:bg-gray-200"
            onClick={() => onClickVideo(url.url)}
            key={url.id}
          >
            <img
              src={`https://img.youtube.com/vi/${parseVideoId(
                url.url
              )}/hqdefault.jpg`}
              className="w-28 h-18"
            />
            <div className="flex flex-col justify-center items-start w-full ml-4">
              <div className="text-lg ">{url.title}</div>
              <div className="my-2 text-xs ">by Daniel Seo</div>
              <div className="my-2 text-sm text-gray-500">
                {moment(url.timestamp).format("MM/DD/YYYY")}
              </div>
            </div>
            <div className="flex flex-col justify-center items-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default UrlList;
