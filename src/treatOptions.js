export default (o) => {
  return {
    idKey: (o && o.idKey) ? o.idKey : 'id',
    queryPath: (o && o.queryPath) ? o.queryPath : null,
    itemsPath: (o && o.itemsPath) ? o.itemsPath : null,
    typeKey: (o && o.typeKey) ? o.typeKey : '__typename'
  }
}
