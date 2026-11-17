// Leva para o vídeo mais recente do canal do YouTube do Euller.
// Roda na Vercel (endereço /api/ultimo-video): lê a lista pública de vídeos do canal (RSS)
// e redireciona para o primeiro. Se der qualquer erro, vai para a página do canal.
const CANAL_ID = 'UCy5Qm6TTnQxRVW1LjoFycaA';
const CANAL_URL = 'https://www.youtube.com/@oeulleraugusto';

module.exports = async (req, res) => {
  let destino = CANAL_URL;
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CANAL_ID}`);
    const xml = await r.text();
    const m = xml.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/);   // o primeiro da lista é o mais novo
    if (m) destino = `https://www.youtube.com/watch?v=${m[1]}`;
  } catch (e) { /* fica com a página do canal */ }
  // guarda a resposta por 10 minutos: vídeo novo aparece em até 10 min
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  res.writeHead(302, { Location: destino });
  res.end();
};
