"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppSessionContext } from "../../../app-session-context";
import { bCls, cardBgCls, linkCls } from "../../../../components/layout/tailwindcss-class";
import Loader from "../../../../components/layout/loader";
import { getProducts } from "../../../../service/api-provider";

export default function AddProducts({ params: { lang } }) {
  const { addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (e) => {
    setLoading(true);
    try {
      setProducts(await getProducts("", "", 1, 250, "createdAt", "desc"));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      addMessage("error", error.message, 5);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ul className="my-5">
        {products.map((p, i) => (
          <li
            className={`overflow-x-auto no-srl-bar flex flex-col sm:flex-row justify-between sm:items-center m-2 p-2 rounded-md ${bCls} ${cardBgCls}`}
            key={i}>
            <Link
              href={`/${lang}/product/${p.name.replaceAll(" ", "-")}`}
              target="__blank"
              className={linkCls + " truncate mb-3 sm:mb-0 sm:mx-3"}>
              {p.name}
            </Link>
            <span className="flex justify-between space-x-2">
              {Object.keys(p.meta.shippableTo).map((country, i) => (
                <Link
                  href={!p.meta.shippableTo[country] ? "#" : p.meta.shippableTo[country]}
                  target="__blank"
                  className={!p.meta.shippableTo[country] ? "" : linkCls}
                  key={i}>
                  {country}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ul>
      {loading && <Loader size="20" />}
    </>
  );
}
