export default (o) => {
  return {
    idKey: (o && o.idKey) ? o.idKey : 'id',
    typeKey: (o && o.typeKey) ? o.typeKey : '__typename',
    itemsPath: (o && o.itemsPath) ? o.itemsPath : null,
    queryPath: (o && o.queryPath) ? o.queryPath : null,
    richTextReferencesPath: (o && o.richTextReferencesPath) ? o.richTextReferencesPath : 'references'
  }
}
