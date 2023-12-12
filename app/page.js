import Layout from "./[lang]/layout";
import HomePageByLang from "./[lang]/page";

export default function Page(props) {
  return (
    <Layout {...props} params={{ lang: "en" }}>
      <HomePageByLang {...props} params={{ lang: "en" }} />
    </Layout>
  );
}

export const metadata = { alternates: { canonical: "/en" } };
