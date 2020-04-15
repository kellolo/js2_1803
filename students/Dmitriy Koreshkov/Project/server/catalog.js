// module.exports =  {
//     add(catalog, item){ 
//         let newCatalog = null
//         item.id_product = new Date()
//         catalog.push(item)
//         newCatalog = catalog
//         return {newCatalog, _id: item.id_product }
//     }
// }

module.exports = {
    add(catalog, item) {
        let newCatalog = null
        item.id_product = new Date()
        catalog.push(item)
        newCatalog = catalog
        return { newCatalog, _id: item.id_product }
    }
}