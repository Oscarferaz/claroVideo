const URL = 'https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&quantity=200&'

export const  getEpgData = async (date) => {
        const ulr = `${URL}date_from=${date}000000&date_to=${date}235959`
        const response = await fetch(ulr);
        const data = await response.json();
        return data?.response?.channels || [];
}