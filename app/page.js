import HomePageByLang from "./[lang]/page";

export default function Page(props) {
  return <HomePageByLang {...props} params={{ lang: "en" }} />;
}
