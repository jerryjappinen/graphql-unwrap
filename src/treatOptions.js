export default (o) => {
  return {
    idKey: (o && o.idKey) ? o.idKey : 'id',
    typeKey: (o && o.typeKey) ? o.typeKey : '__typename'
  }
}
