import { getForecastByCityAndDate, obterCoordenadas } from "../../js/apis-externas.js";

export async function obterPrevisaoEvento(city, date, hour) {
    if (!city || city === 'default' || !date || !hour) return null;
    return await getForecastByCityAndDate(city, date, hour);
}

export async function obterCoordenadasCidade(cidade) {
    return await obterCoordenadas(cidade);
}