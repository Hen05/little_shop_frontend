export function formatToReal(valor) {
    if (isNaN(valor) || valor === null) return "R$ 0,00";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}