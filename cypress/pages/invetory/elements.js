export const elements =  {

    addToCart: (itemName) => `[data-test="add-to-cart-${tranform(itemName)}` ,
    removeFromCart: (itemName) => `[data-test="remove-${tranform(itemName)}`

}

function tranform(texto) {
    return texto.replaceAll(' ' , '-').toLowerCase()
}
