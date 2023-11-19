import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

export default function FilterList({ lang, content }) {
  return (
    <>
      <nav>
        <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
          {content.title[lang]}
        </h3>
        <ul className="hidden md:block">
          {content.list.map((item, i) => (
            <FilterItem key={i} lang={lang} item={item} />
          ))}
        </ul>

        <ul className="md:hidden">
          <FilterItemDropdown lang={lang} list={content.list} />
        </ul>
      </nav>
    </>
  );
}
