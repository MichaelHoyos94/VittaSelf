const colombianPesoFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function formatCurrency(value) {
    const amount = Number(value);

    return Number.isFinite(amount)
        ? colombianPesoFormatter.format(amount)
        : "";
}
