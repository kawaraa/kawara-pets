"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { request } from "../../../../service/request";
import { AppSessionContext } from "../../../app-session-context";
import { Button } from "../../../../components/layout/button";
import Modal from "../../../../components/layout/modal";
import { done } from "../../../../components/content/shared-content";
import { cardBgCls, linkCls } from "../../../../components/layout/tailwindcss-class";
import { Cookies, copyText } from "../../../../service/utilities";
import Collapse from "../../../../components/layout/collapse";
import Loader from "../../../../components/layout/loader";
import SvgIcon from "../../../../components/layout/svg-icon";
const siteName = process.env.SITE_NAME || "";

export default function Orders({ params: { lang } }) {
  const { addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const router = useRouter();

  const fulfillOrder = async () => {
    setModalLoading(true);
    try {
      await request(`/api/admin-order?payment_id=${orderId}`, "POST");
      // window.location.reload();
      setOrders(orders.filter((o) => o.paymentId != orderId));
      setModalLoading(false);
      setOrderId("");
    } catch (error) {
      setModalLoading(false);
      setOrderId("");
      addMessage("error", error.message, 5);
    }
  };

  const copy = async (text) => {
    await copyText(text);
    addMessage("success", done[lang], 3);
  };

  const fetchOpenOrders = async () => {
    try {
      setOrders(await request("/api/admin-order?status=PENDING"));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      addMessage("error", error.message, 5);
      setTimeout(() => {
        Cookies.remove("accessToken");
        router.replace("/");
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = `${content.h1[lang]} - ${siteName}`;
    if (Cookies.get("accessToken")) fetchOpenOrders();
    else router.replace("/");
  }, []);

  if (loading) return <Loader full size="50" />;
  return (
    <>
      <ul>
        {orders.map((o, i) => (
          <Collapse
            Tag="li"
            title={
              <>
                <span className="">{o.name}</span>
                <span className="flex-auto"></span>
                <span className="mx-3 bg-yellow-400 px-2 text-sm text-white rounded-full">
                  {content.statuses[o.status][lang] || content.statuses[o.status]}
                </span>
              </>
            }
            cls="my-2 rounded-lg"
            hCls={cardBgCls + " flex items-center rounded-lg"}
            key={o.paymentId + i}>
            {o.lineItems.map((item, i) => (
              <div
                className="mb-3 flex flex-col md:items-center md:flex-row border-b-[1px] border-gray-300"
                key={i}>
                <div className="mb-1 flex items-center">
                  <span className="overflow-hidden w-10 h-10 rounded-md">
                    <Image
                      src={item.imageUrl}
                      alt="Order line item image"
                      width="1000"
                      height="1000"
                      className="w-full h-full preview"
                    />
                  </span>

                  <Link
                    aria-label="Order line item product page"
                    href={`/en/product/${item.name.replaceAll(" ", "-")}`}
                    className={linkCls + " mx-3"}
                    target="__blank">
                    {content.source[lang]}
                  </Link>

                  <Link
                    aria-label="Order line item product source link"
                    href={item.sourceLink}
                    className={linkCls + " sm:mx-3"}
                    target="__blank">
                    {content.sourceLink[lang]}
                  </Link>
                </div>

                <span className="sm:w-44 truncate sm:mx-3" title={item.name}>
                  {item.name}
                </span>

                <span className="sm:mx-3">
                  {item.options} - ( {item.quantity} )
                </span>
              </div>
            ))}

            <address dir="ltr" className="flex p-5 flex-col sm:flex-row">
              <CopyableText onCopy={() => copy(o.name)}>{o.name}</CopyableText>
              <CopyableText onCopy={() => copy(o.address.line1)}>{o.address.line1}</CopyableText>
              {o.address.line2 && (
                <CopyableText onCopy={() => copy(o.address.line2)}>{o.address.line2}</CopyableText>
              )}
              <CopyableText onCopy={() => copy(o.address.postal_code)}>{o.address.postal_code}</CopyableText>
              <CopyableText onCopy={() => copy(o.address.city)}>{o.address.city}</CopyableText>
              {o.address.state && (
                <CopyableText onCopy={() => copy(o.address.state)}>{o.address.state}</CopyableText>
              )}
              {o.address.country && (
                <CopyableText onCopy={() => copy(o.address.country)}>{o.address.country}</CopyableText>
              )}
            </address>
            <div className="text-right">
              <Button onClick={() => setOrderId(o.paymentId)} cls="!text-sm !py-1 !px-2">
                {content.fulfill[lang]}
              </Button>
            </div>
          </Collapse>
        ))}
      </ul>

      <Modal
        title={content.modal.title[lang]}
        open={!!orderId}
        onCancel={() => setOrderId("")}
        onApprove={fulfillOrder}
        okBtn={content.modal.ok[lang]}
        loading={modalLoading}>
        {content.modal.desc[lang]}
      </Modal>
    </>
  );
}

const CopyableText = ({ onCopy, children }) => {
  return (
    <span onClick={onCopy} className="mx-3 flex items-center p-1 text-sm font-semibold">
      {children}
      <span className="w-4 mx-1">
        <SvgIcon name="copy" />
      </span>
    </span>
  );
};

const content = {
  h1: { en: "Add products form", ar: "نموذج إضافة المنتجات" },
  source: { en: "Product link", ar: "رابط المنتج" },
  sourceLink: { en: "Product source link", ar: "رابط مصدر المنتج" },
  fulfill: { en: "Fulfill it", ar: "تم الطلب" },
  modal: {
    title: { en: "Order fulfillment confirmation", ar: "تأكيد تنفيذ الطلب" },
    desc: {
      en: "Are you sure you want to mark the order as fulfilled?",
      ar: "هل أنت متأكد أنك تريد تنفيذ الطلب؟",
    },
    ok: { en: "Yes", ar: "نعم" },
  },
  statuses: {
    PENDING: { ar: "قيد الانتظار" },
    PARTIAL: { ar: "تم الطلب جزئيا" },
    FULFILLED: { ar: "تم الطلب" },
    SHIPPED: { ar: "تم شحنه" },
    DELIVERED: { ar: "تم التوصيل" },
  },
};
