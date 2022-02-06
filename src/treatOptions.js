export default (o) => {
  return {
    idKey: (o && o.idKey) ? o.idKey : 'id',
    itemsPath: (o && o.itemsPath) ? o.itemsPath : null,
    typeKey: (o && o.typeKey) ? o.typeKey : '__typename'
  }
}
