const h2Cls = "text-lg font-bold mt-8 mb-3";

export function Article({ lang, article }) {
  const ps = Array.isArray(article.p[lang]) ? article.p[lang] : [article.p[lang]];

  return (
    <article>
      {article.t && <p>{article.t[lang]}</p>}
      <h2 className={h2Cls}>{article.h[lang]}</h2>

      {ps.map((p, i) => (
        <p key={i}>{p}.</p>
      ))}
    </article>
  );
}

export function SectionLisItem({ lang, content, itemNumber }) {
  const ps = content.p[lang];

  return (
    <li>
      <h2 className={h2Cls}>
        {itemNumber}. {content.h[lang]}
      </h2>

      {!Array.isArray(ps) ? (
        <p className="mx-5">{ps}.</p>
      ) : (
        <ol className="mx-5">
          {ps.map((p, i) => {
            const [subject, term] = p.split(":");
            return (
              <li key={i}>
                <strong>
                  {itemNumber}.{i + 1} {subject || ""}:
                </strong>
                {term}
              </li>
            );
          })}
        </ol>
      )}
    </li>
  );
}
