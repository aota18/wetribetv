import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useForm } from "react-hook-form";
import Link from "next/link";

const AddUrl = ({ user }) => {
  const router = useRouter();
  const urlDocRef = doc(collection(db, "urls"));
  const { register, handleSubmit } = useForm();
  const [category, setCategory] = useState([]);

  const onSubmit = async (values) => {
    await setDoc(urlDocRef, {
      creatorId: user.id,
      creator: user.nickname,
      title: values.title,
      category: values.category,
      url: values.url,
      timestamp: Timestamp.fromDate(new Date()),
    }).then((res) => router.push("/"));
  };

  return (
    <form className="w-full my-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col my-4">
        <label className="text-lg text-gray-600">Title</label>
        <input
          className="border border-indigo-500 p-3 text-lg rounded-md focus:ring-indigo-500"
          type="text"
          name="title"
          {...register("title", { required: true, maxLength: 20 })}
        />
      </div>

      <div className="flex flex-col my-4">
        <label className="text-lg text-gray-600">Category</label>
        <input
          className="border border-indigo-500 p-3 text-lg rounded-md focus:ring-indigo-500"
          type="text"
          name="category"
          {...register("category", { required: true, maxLength: 20 })}
        />
      </div>

      <div className="flex flex-col my-4">
        <label className="text-lg text-gray-600">URL</label>
        <input
          className="border border-indigo-500 p-3 text-lg rounded-md focus:ring-indigo-500"
          type="text"
          name="url"
          {...register("url", {
            required: true,
            pattern: `https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`,
          })}
        />
      </div>

      <div className="my-8">
        <div
          onClick={() => router.push("/")}
          className="text-center my-2 w-full border border-red-300 p-3 text-lg rounded-md bg-red-500 text-white"
        >
          Cancel
        </div>
        <button className="my-2 w-full border border-indigo-500 p-3 text-lg rounded-md bg-indigo-500 text-white">
          OK
        </button>
      </div>
    </form>
  );
};

export default AddUrl;
