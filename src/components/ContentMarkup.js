function ContentMarkup(content) {
  const regexp = />>([0-9]*)/gm;

  const ids = content.match(regexp);

  if (ids) {
    const newIds = ids.map(
      (id) => `<a href="#${id.replace(">>", "")}">${id.replace(">>", "")}</a>`
    );

    for (let i = 0; i < ids.length; i++) {
      content = content.replace(ids[i], newIds[i]);
    }

    content = content.replaceAll('">', '">>>');
  }

  return content;
}

export default ContentMarkup;
